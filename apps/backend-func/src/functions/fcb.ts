import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as crypto from "crypto";
import * as TE from "fp-ts/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

import { Config } from "../config";
import { Session } from "../models/session";
import { RedisClientFactory } from "../utils/redis";
import { setWithExpirationTask } from "../utils/redis_storage";

interface Dependencies {
  config: Config;
  redisClientFactory: RedisClientFactory;
}

const mockedSessionData: Session = {
  firstName: "Name" as NonEmptyString,
  fiscalCode: "SRNNMU90T12C444Z" as FiscalCode,
  lastName: "Surname" as NonEmptyString,
};

// we create a fake session until FIMS is not integrated
export const createSession = (
  deps: Dependencies,
): TE.TaskEither<Error, string> =>
  pipe(
    TE.Do,
    TE.bind("sessionId", () => TE.of(crypto.randomBytes(32).toString("hex"))),
    TE.bind("sessionToken", () =>
      TE.of(crypto.randomBytes(32).toString("hex")),
    ),
    TE.chain(({ sessionId, sessionToken }) =>
      pipe(
        // set mocked session
        setWithExpirationTask(
          deps.redisClientFactory,
          sessionId,
          JSON.stringify(mockedSessionData),
          1800,
        ),
        TE.chain(() =>
          // bind one time session id to session token
          setWithExpirationTask(
            deps.redisClientFactory,
            sessionId,
            sessionToken,
            60,
          ),
        ),
        TE.map(() => sessionId),
      ),
    ),
  );

export const makeFimsCallbackHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<null, 302>,
  Dependencies
> = H.of(() =>
  pipe(
    createSession,
    RTE.chain((sessionId) =>
      pipe(
        RTE.ask<Dependencies, Error>(),
        RTE.map(({ config }) =>
          pipe(
            H.empty,
            H.withStatusCode(302),
            H.withHeader(
              "Location",
              `${config.CDC_BASE_URL}/authorize?id=${sessionId}`,
            ),
          ),
        ),
      ),
    ),
  ),
);

export const FimsCallbackFn = httpAzureFunction(makeFimsCallbackHandler);
