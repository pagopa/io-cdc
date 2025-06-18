import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as crypto from "crypto";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { withParams } from "../middlewares/withParams.js";
import { Session } from "../models/session.js";
import {
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { OidcClient, OidcUser, getFimsUserTE } from "../utils/fims.js";
import { RedisClientFactory } from "../utils/redis.js";
import { setWithExpirationTask } from "../utils/redis_storage.js";
import { storeSessionTe } from "../utils/session.js";

interface Dependencies {
  config: Config;
  fimsClient: OidcClient;
  redisClientFactory: RedisClientFactory;
}

const QueryParams = t.type({
  code: NonEmptyString,
  state: NonEmptyString,
  iss: NonEmptyString,
});
type QueryParams = t.TypeOf<typeof QueryParams>;

const Headers = t.type({
  "signature-input": NonEmptyString,
  signature: NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

const mockedSessionData: Session = {
  family_name: "Surname" as NonEmptyString,
  fiscal_code: "SRNNMU90T12C444Z" as FiscalCode,
  given_name: "Name" as NonEmptyString,
};

export const getFimsData =
  (code: string, state: string) => (deps: Dependencies) =>
    pipe(
      getFimsUserTE(
        deps.fimsClient,
        `${deps.config.CDC_BASE_URL}/fcb`,
        code,
        state,
      ),
      TE.mapLeft(() =>
        responseError(401, "Cannot retrieve user data", "Unauthorized"),
      ),
    );

export const checkLollipop =
  (user: OidcUser, headers: Headers) => (deps: Dependencies) =>
    pipe(TE.of(user));

// we create a fake session until FIMS is not integrated
export const createSessionAndRedirect =
  (user: OidcUser) => (deps: Dependencies) =>
    pipe(
      TE.Do,
      TE.bind("sessionId", () => TE.of(crypto.randomBytes(32).toString("hex"))),
      TE.bind("sessionToken", () =>
        TE.of(crypto.randomBytes(32).toString("hex")),
      ),
      TE.chain(({ sessionId, sessionToken }) =>
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
          TE.map(() => `${deps.config.CDC_BASE_URL}/authorize?id=${sessionId}`),
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
    withParams(QueryParams, req.query),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(({ code, state }) => getFimsData(code, state)),
    RTE.chainW((user) =>
      pipe(
        withParams(Headers, req.headers),
        RTE.mapLeft(errorToValidationError),
        RTE.map((headers) => ({ user, headers })),
      ),
    ),
    RTE.chainW(({ user, headers }) => checkLollipop(user, headers)),
    RTE.chainW((user) => createSessionAndRedirect(user as OidcUser)),
    RTE.map((redirectUrl) =>
      pipe(
        H.empty,
        H.withStatusCode(302),
        H.withHeader("Location", redirectUrl),
      ),
    ),
    responseErrorToHttpError,
  ),
);

export const FimsCallbackFn = httpAzureFunction(makeFimsCallbackHandler);
