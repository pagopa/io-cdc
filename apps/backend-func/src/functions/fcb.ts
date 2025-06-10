import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as crypto from "crypto";
import { pipe } from "fp-ts/lib/function.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";

import { Config } from "../config.js";
import { Session } from "../models/session.js";
import { OidcClient, OidcUser, getFimsUserTE } from "../utils/fims.js";
import { RedisClientFactory } from "../utils/redis.js";
import { setWithExpirationTask } from "../utils/redis_storage.js";
import { storeSessionTe } from "../utils/session.js";

interface Dependencies {
  config: Config;
  fimsClient: OidcClient;
  redisClientFactory: RedisClientFactory;
}

const mockedSessionData: Session = {
  family_name: "Surname" as NonEmptyString,
  fiscal_code: "SRNNMU90T12C444Z" as FiscalCode,
  given_name: "Name" as NonEmptyString,
};

export const getFimsData =
  (code: string, state: string) => (deps: Dependencies) =>
    getFimsUserTE(
      deps.fimsClient,
      `${deps.config.CDC_BASE_URL}/fcb`,
      code,
      state,
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
    );

export const makeFimsCallbackHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<null, 302>,
  Dependencies
> = H.of(() =>
  pipe(
    //getFimsData(req.query.code, req.query.state),
    createSessionAndRedirect(mockedSessionData as OidcUser), // remove this mock and RTE.map the result of commented code
    RTE.map((redirectUrl) =>
      pipe(
        H.empty,
        H.withStatusCode(302),
        H.withHeader("Location", redirectUrl),
      ),
    ),
  ),
);

export const FimsCallbackFn = httpAzureFunction(makeFimsCallbackHandler);
