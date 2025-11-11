import { ContainerClient } from "@azure/storage-blob";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { JwkPublicKey } from "@pagopa/ts-commons/lib/jwk.js";
import { readableReportSimplified } from "@pagopa/ts-commons/lib/reporters.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as crypto from "crypto";
import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { withParams } from "../middlewares/withParams.js";
import { OperationTypes, storeAuditLog } from "../utils/audit_logs.js";
import { fromBase64 } from "../utils/base64.js";
import {
  ResponseError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { OidcClient, OidcUser, getFimsUserTE } from "../utils/fims.js";
import { toHash } from "../utils/hash.js";
import {
  verifyHttpSignatures,
  verifyState,
} from "../utils/httpSignature.verifiers.js";
import {
  getAssertionIssueInstantVerifier,
  getAssertionRefVsInRensponseToVerifier,
  getAssertionUserIdVsCfVerifier,
} from "../utils/lollipop.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getTask, setWithExpirationTask } from "../utils/redis_storage.js";
import { checkAssertionSignatures, parseAssertion } from "../utils/saml.js";
import { storeSessionTe } from "../utils/session.js";
import { traceEvent } from "../utils/tracing.js";

interface Dependencies {
  auditContainerClient: ContainerClient;
  config: Config;
  fimsClient: OidcClient;
  redisClientFactory: RedisClientFactory;
}

const QueryParams = t.type({
  code: NonEmptyString,
  iss: NonEmptyString,
  state: NonEmptyString,
});
type QueryParams = t.TypeOf<typeof QueryParams>;

const Headers = t.type({
  signature: NonEmptyString,
  "signature-input": NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

export const getFimsData =
  (code: string, state: string, iss: string) => (deps: Dependencies) =>
    pipe(
      TE.Do,
      TE.bind("maybeNonce", () => getTask(deps.redisClientFactory, state)),
      TE.chain(({ maybeNonce }) =>
        pipe(
          maybeNonce,
          TE.fromOption(() => new Error("Nonce not found")),
          TE.chain((nonce) =>
            getFimsUserTE(
              deps.fimsClient,
              deps.config.FIMS_REDIRECT_URL,
              code,
              state,
              nonce,
              iss,
            ),
          ),
        ),
      ),
      TE.chainFirst((fimsUser) =>
        storeAuditLog(
          deps.auditContainerClient,
          {
            authCode: code,
            fiscalCode: fimsUser.fiscal_code,
          },
          {
            DateTime: fimsUser.auth_time || new Date().toISOString(),
            FiscalCode: fimsUser.fiscal_code,
            Type: OperationTypes.FIMS,
          },
        ),
      ),
      TE.mapLeft((e) =>
        responseError(
          401,
          `Cannot retrieve user data | ${e.message}`,
          "Unauthorized",
        ),
      ),
    );

export const checkIssuer = (issuer: string) => (deps: Dependencies) =>
  pipe(
    TE.fromPredicate<Error, string>(
      (issuer) => issuer === deps.config.FIMS_ISSUER_URL,
      () => new Error("Invalid Issuer"),
    )(issuer),
    TE.mapLeft((e) =>
      responseError(401, `Checks | ${e.message}`, "Unauthorized"),
    ),
  );

export const checkAssertion = (user: OidcUser) => (deps: Dependencies) =>
  pipe(
    TE.tryCatch(
      () =>
        checkAssertionSignatures(
          user.assertion,
          deps.config.PAGOPA_IDP_KEYS_BASE_URL,
        ),
      E.toError,
    ),
    TE.map(() => user),
    TE.mapLeft((e) =>
      responseError(401, `Assertion|${e.message}`, "Unauthorized"),
    ),
  );

export const checkLollipop =
  (user: OidcUser, headers: Headers, state: string) => (deps: Dependencies) =>
    pipe(
      TE.Do,
      TE.bind("publicKey", () =>
        pipe(
          fromBase64(user.public_key),
          JwkPublicKey.decode,
          E.mapLeft((e) => new Error(readableReportSimplified(e))),
          TE.fromEither,
        ),
      ),
      TE.bind("assertion", () => parseAssertion(user.assertion)),
      TE.chain(({ assertion, publicKey }) =>
        pipe(
          getAssertionRefVsInRensponseToVerifier(
            publicKey,
            user.assertion_ref,
          )(assertion),
          TE.chain(() =>
            getAssertionUserIdVsCfVerifier(user.fiscal_code)(assertion),
          ),
          TE.chain(() => getAssertionIssueInstantVerifier()(assertion)),
          TE.chain(() =>
            verifyHttpSignatures(
              user.assertion_ref,
              headers,
              deps.config.FIMS_REDIRECT_URL,
              publicKey,
            ),
          ),
          TE.chain(() => verifyState(headers, state)),
        ),
      ),
      TE.map(() => user),
      TE.chainFirst((user) =>
        storeAuditLog(
          deps.auditContainerClient,
          {
            assertion: user.assertion,
            assertionRef: user.assertion_ref,
            fiscalCode: user.fiscal_code,
            publicKey: user.public_key,
          },
          {
            DateTime: user.auth_time || new Date().toISOString(),
            FiscalCode: user.fiscal_code,
            Type: OperationTypes.LOLLIPOP,
          },
        ),
      ),
      TE.mapLeft((e) =>
        responseError(401, `Lollipop|${e.message}`, "Unauthorized"),
      ),
    );

/**
 * Perform necessary checks for non-test users
 */
const doSSOChecks =
  (user: OidcUser, headers: Headers, state: string) => (deps: Dependencies) =>
    pipe(
      deps.config.TEST_USERS.includes(toHash(user.fiscal_code)),
      O.fromPredicate((isTestUser) => !isTestUser),
      O.map(() =>
        pipe(
          TE.of(user),
          TE.chain((user) => checkAssertion(user)(deps)),
          TE.chain((user) => checkLollipop(user, headers, state)(deps)),
        ),
      ),
      O.getOrElse(() =>
        traceEvent(TE.of<ResponseError, OidcUser>(user))(
          "doSSOChecks",
          `cdc.sso.check.bypass`,
          "Lollipop and assertion checks bypassed by test user",
        ),
      ),
    );

export const createSessionAndRedirect =
  (user: OidcUser, state: string) => (deps: Dependencies) =>
    pipe(
      TE.Do,
      TE.bind("sessionId", () => TE.of(crypto.randomBytes(32).toString("hex"))),
      TE.bind("sessionToken", () =>
        TE.of(crypto.randomBytes(32).toString("hex")),
      ),
      TE.bind("deviceQueryParam", () =>
        pipe(
          getTask(deps.redisClientFactory, `device-${state}`),
          TE.map(
            flow(
              O.fold(
                () => "",
                (device) => `&device=${device}`,
              ),
            ),
          ),
        ),
      ),
      TE.chain(({ deviceQueryParam, sessionId, sessionToken }) =>
        pipe(
          storeSessionTe(deps.redisClientFactory, sessionToken, user),
          TE.chain(() =>
            // bind one time session id to session token
            setWithExpirationTask(
              deps.redisClientFactory,
              sessionId,
              sessionToken,
              60,
            ),
          ),
          TE.map(
            () =>
              `${deps.config.CDC_BASE_URL}/authorize?id=${sessionId}${deviceQueryParam}`,
          ),
        ),
      ),
      TE.mapLeft(() =>
        responseError(401, "Cannot create session", "Unauthorized"),
      ),
    );

export const makeFimsCallbackHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<null, 302>,
  Dependencies
> = H.of((req) =>
  pipe(
    TE.Do,
    TE.bind("query", withParams(QueryParams, req.query)),
    TE.bind("headers", withParams(Headers, req.headers)),
    TE.mapLeft(errorToValidationError),
    RTE.fromTaskEither,
    RTE.chain(({ headers, query }) =>
      pipe(
        checkIssuer(query.iss),
        RTE.chain((issuer) => getFimsData(query.code, query.state, issuer)),
        RTE.chain((user) => doSSOChecks(user, headers, query.state)),
        RTE.chain((user) =>
          createSessionAndRedirect(user as OidcUser, query.state),
        ),
      ),
    ),
    RTE.map((redirectUrl) =>
      pipe(
        H.empty,
        H.withStatusCode(302),
        H.withHeader("Location", redirectUrl),
      ),
    ),
    RTE.mapLeft((responseError) =>
      traceEvent(responseError)(
        "fimsCallbackHandler",
        `cdc.fims.failure`,
        `Error: ${responseError.message}`,
      ),
    ),
    responseErrorToHttpError,
  ),
);

export const FimsCallbackFn = httpAzureFunction(makeFimsCallbackHandler);
