import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { RedisClientFactory } from "../utils/redis";
import { SessionToken } from "../generated/definitions/internal/SessionToken";
import { getTask } from "../utils/redis_storage";

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
          TE.fromOption(() => new Error("Session not found")),
          TE.map((sessionToken) => ({ token: sessionToken })),
        ),
      ),
    );

export const makeAuthorizeHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<SessionToken, 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    getSessionToken(req.query.id),
    RTE.map((session) => H.successJson(session)),
  ),
);

export const AuthorizeFn = httpAzureFunction(makeAuthorizeHandler);
