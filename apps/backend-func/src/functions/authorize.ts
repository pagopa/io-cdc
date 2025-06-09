import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as TE from "fp-ts/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

import { SessionToken } from "../generated/definitions/internal/SessionToken";
import { RedisClientFactory } from "../utils/redis";
import { deleteTask, getTask } from "../utils/redis_storage";

interface Dependencies {
  redisClientFactory: RedisClientFactory;
}

export const getSessionToken =
  (id: string) =>
  (deps: Dependencies): TE.TaskEither<Error, SessionToken> =>
    pipe(
      getTask(deps.redisClientFactory, id),
      TE.chain((reply) =>
        pipe(
          reply,
          TE.fromOption(() => new Error("Session token not found")),
          TE.map((sessionToken) => ({ token: sessionToken })),
        ),
      ),
      TE.chainFirst(() => deleteTask(deps.redisClientFactory, id)),
    );

export const makeAuthorizeHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<SessionToken, 200>,
  Dependencies
> = H.of((req) => pipe(getSessionToken(req.query.id), RTE.map(H.successJson)));

export const AuthorizeFn = httpAzureFunction(makeAuthorizeHandler);
