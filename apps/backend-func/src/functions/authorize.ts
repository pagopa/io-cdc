import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { SessionToken } from "../generated/definitions/internal/SessionToken.js";
import { withParams } from "../middlewares/withParams.js";
import {
  ResponseError,
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { RedisClientFactory } from "../utils/redis.js";
import { deleteTask, getTask } from "../utils/redis_storage.js";

interface Dependencies {
  redisClientFactory: RedisClientFactory;
}

const QueryParams = t.type({
  id: NonEmptyString,
});
type QueryParams = t.TypeOf<typeof QueryParams>;

export const getSessionToken =
  (params: QueryParams) =>
  (deps: Dependencies): TE.TaskEither<ResponseError, SessionToken> =>
    pipe(
      getTask(deps.redisClientFactory, params.id),
      TE.mapLeft(errorToInternalError),
      TE.chain((reply) =>
        pipe(
          reply,
          TE.fromOption(() =>
            responseError(401, "Session not found", "Unauthorized"),
          ),
          TE.map((sessionToken) => ({ token: sessionToken })),
        ),
      ),
      TE.chainFirst(() =>
        pipe(
          deleteTask(deps.redisClientFactory, params.id),
          TE.mapLeft(errorToInternalError),
        ),
      ),
    );

export const makeAuthorizeHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<SessionToken, 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(QueryParams, req.query),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(flow(getSessionToken, RTE.map(H.successJson))),
    responseErrorToHttpError,
  ),
);

export const AuthorizeFn = httpAzureFunction(makeAuthorizeHandler);
