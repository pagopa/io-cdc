import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { JwkPublicKey } from "@pagopa/ts-commons/lib/jwk.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as crypto from "crypto";
import * as E from "fp-ts/lib/Either.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { withParams } from "../middlewares/withParams.js";
import { fromBase64 } from "../utils/base64.js";
import {
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { OidcClient, OidcUser, getFimsUserTE } from "../utils/fims.js";
import {
  getAssertionIssueInstantVerifier,
  getAssertionRefVsInRensponseToVerifier,
  getAssertionUserIdVsCfVerifier,
} from "../utils/lollipop.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getTask, setWithExpirationTask } from "../utils/redis_storage.js";
import { checkAssertionSignatures, parseAssertion } from "../utils/saml.js";
import { storeSessionTe } from "../utils/session.js";

interface Dependencies {
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

/*  
  Check lollipop
  [ ] Verificare che l’assertion SAML restituita (claim assertion) sia firmata da un IDP (SPID o CIE)
  [X] Verificare che il campo InResponseTo della assertion SAML corrisponda a assertion_ref
  [X] Verificare che il campo FiscalNumber corrisponda ai claim sub o fiscal_code
  [X] Verificare che la data di emissione della asserzione (IssueInstant) non sia superiore a 365 giorni fa
  [X] Assertion_ref ha il formato algoritmo-thumbprint(public key), verificare se sia valido generando il thumbprint 
    del claim public_key usando l’algoritmo indicato (ad esempio sha256)
  [ ] Verificare la firma dell’header Signature usando il contenuto del claim public_key
  [ ] Verificare se il nonce firmato nel campo Signature corrisponde allo state OIDC

  A causa di:
  * la dipendenza del protocollo LolliPoP dalle assertion SPID e dalle relative chiavi che possono cambiare nel tempo
  * il particolare meccanismo di login implementato nell’app che prevede sessioni lunghe 30 o 365 giorni a parità di assertion
  il cambiamento di una chiave in presenza di una sessione attiva provoca un fallimento nelle verifiche LolliPoP.
  Per gestire questa casistica è fondamentale che tu predisponga un sistema che ti consenta di mantenere uno storico delle chiavi 
  (per validare le assertion precedenti) e di ottenere le nuove, tenendo conto della durata delle sessioni su IO.
  In ogni caso, in presenza dell'impossibilità di portare a termine la verifica, il tuo sistema dovrebbe fare fallback su una 
  nuova richiesta di login SPID all’utente, specificando che qualcosa è andato storto nel processo di identificazione automatica.
  */
export const checkLollipop =
  (user: OidcUser, headers: Headers) => (deps: Dependencies) =>
    pipe(
      TE.Do,
      TE.bind("publicKey", () =>
        pipe(
          fromBase64(user.public_key),
          JwkPublicKey.decode,
          E.mapLeft((e) => new Error("")),
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
        ),
      ),
      TE.map(() => user),
      TE.mapLeft((e) =>
        responseError(401, `Lollipop|${e.message}`, "Unauthorized"),
      ),
    );

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
    TE.Do,
    TE.bind("query", withParams(QueryParams, req.query)),
    TE.bind("headers", withParams(Headers, req.headers)),
    TE.mapLeft(errorToValidationError),
    RTE.fromTaskEither,
    RTE.chain(({ headers, query }) =>
      pipe(
        checkIssuer(query.iss),
        RTE.chain((issuer) => getFimsData(query.code, query.state, issuer)),
        RTE.chain((user) => checkAssertion(user)),
        RTE.chain((user) => checkLollipop(user, headers)),
        RTE.chain((user) => createSessionAndRedirect(user as OidcUser)),
      ),
    ),
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
