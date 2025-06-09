import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as crypto from "crypto";
import * as TE from "fp-ts/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

import { Config } from "../config";
import { Session } from "../models/session";
import { OidcClient, OidcUser, getFimsUserTE } from "../utils/fims";
import { RedisClientFactory } from "../utils/redis";
import { setWithExpirationTask } from "../utils/redis_storage";
import { storeSessionTe } from "../utils/session";

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
          // set mocked session
          storeSessionTe(
            deps.redisClientFactory,
            sessionToken,
            mockedSessionData || user,
          ), // TODO: remove mocked session data when testing fims
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
> = H.of((req) =>
  pipe(
    getFimsData(req.query.code, req.query.state),
    RTE.chain(createSessionAndRedirect),
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
