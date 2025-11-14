import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { enumType } from "@pagopa/ts-commons/lib/types.js";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, identity, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import {
  RouteEnum,
  SessionToken,
} from "../generated/definitions/internal/SessionToken.js";
import { withParams } from "../middlewares/withParams.js";
import {
  ResponseError,
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { toHash } from "../utils/hash.js";
import { RedisClientFactory } from "../utils/redis.js";
import { deleteTask, getTask } from "../utils/redis_storage.js";
import { getSessionTE } from "../utils/session.js";

interface Dependencies {
  config: Config;
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
      TE.Do,
      TE.bind("sessionToken", () =>
        pipe(
          getTask(deps.redisClientFactory, `session-${params.id}`),
          TE.mapLeft(errorToInternalError),
          TE.chain(
            TE.fromOption(() =>
              responseError(401, "Session not found", "Unauthorized"),
            ),
          ),
          TE.chainFirst(() =>
            pipe(
              // delete one time session id to session token association
              deleteTask(deps.redisClientFactory, `session-${params.id}`),
              TE.mapLeft(errorToInternalError),
            ),
          ),
        ),
      ),
      TE.bind("route", () =>
        pipe(
          getTask(deps.redisClientFactory, `route-${params.id}`),
          TE.mapLeft(errorToInternalError),
          TE.map(flow(O.fold(() => deps.config.ROUTE, identity))),
          TE.chain(
            flow(
              TE.fromPredicate(
                (route) => enumType<RouteEnum>(RouteEnum, "route").is(route),
                () => responseError(401, "Invalid route", "Unauthorized"),
              ),
            ),
          ),
          TE.chainFirst(() =>
            pipe(
              // delete one time session id to route association
              deleteTask(deps.redisClientFactory, `route-${params.id}`),
              TE.mapLeft(errorToInternalError),
            ),
          ),
        ),
      ),
      TE.chain(({ route, sessionToken }) =>
        pipe(
          getSessionTE(deps.redisClientFactory, sessionToken),
          TE.mapLeft(() =>
            responseError(401, "Session not found", "Unauthorized"),
          ),
          TE.map((session) =>
            pipe(toHash(session.fiscal_code), (cfHash) =>
              deps.config.TEST_USERS.includes(cfHash)
                ? { route: RouteEnum.USAGE, token: sessionToken }
                : { route, token: sessionToken },
            ),
          ),
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
