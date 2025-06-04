import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { RedisClientFactory } from "../utils/redis";
import { setTask } from "../utils/redis_storage";
import * as crypto from "crypto";
import { Config } from "../config";
import { Session } from "../models/session";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";

interface Dependencies {
  redisClientFactory: RedisClientFactory;
  config: Config;
}

const mockedSessionData: Session = {
  firstName: "Name" as NonEmptyString,
  lastName: "Surname" as NonEmptyString,
  fiscalCode: "SRNNMU90T12C444Z" as FiscalCode,
};

// we create a fake session until FIMS is not integrated
export const createSession = (
  deps: Dependencies,
): TE.TaskEither<Error, string> =>
  pipe(
    TE.of(crypto.randomBytes(32).toString("hex")),
    TE.chain((sessionId) =>
      pipe(
        setTask(
          deps.redisClientFactory,
          sessionId,
          JSON.stringify(mockedSessionData),
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
