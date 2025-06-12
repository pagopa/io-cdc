import { readableReport } from "@pagopa/ts-commons/lib/reporters.js";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";

import { Session } from "../models/session.js";
import { RedisClientFactory } from "./redis.js";
import { getTask, setWithExpirationTask } from "./redis_storage.js";

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
