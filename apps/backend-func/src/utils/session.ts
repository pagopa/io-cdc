import { readableReport } from "@pagopa/ts-commons/lib/reporters";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { flow, pipe } from "fp-ts/lib/function";

import { Session } from "../models/session";
import { RedisClientFactory } from "./redis";
import { getTask, setWithExpirationTask } from "./redis_storage";

export const storeSessionTe = (
  redisClientFactory: RedisClientFactory,
  sessionToken: string,
  sessionData: Session,
) =>
  pipe(
    setWithExpirationTask(
      redisClientFactory,
      sessionToken,
      JSON.stringify(sessionData),
      1800,
    ),
  );

export const getSessionTE = (
  redisClientFactory: RedisClientFactory,
  sessionToken: string,
) =>
  pipe(
    getTask(redisClientFactory, sessionToken),
    TE.chain(TE.fromOption(() => new Error("Session not found"))),
    TE.map(JSON.parse),
    TE.map(Session.decode),
    TE.chain(
      flow(
        E.mapLeft(
          (e) => new Error(`Cannot decode session|${readableReport(e)}`),
        ),
        TE.fromEither,
      ),
    ),
  );
