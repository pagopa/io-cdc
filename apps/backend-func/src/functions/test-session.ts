import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { enumType } from "@pagopa/ts-commons/lib/types.js";
import * as crypto from "crypto";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import {
  RouteEnum,
  SessionToken,
} from "../generated/definitions/internal/SessionToken.js";
import { withParams } from "../middlewares/withParams.js";
import { Session } from "../models/session.js";
import {
  ResponseError,
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { toHash } from "../utils/hash.js";
import { RedisClientFactory } from "../utils/redis.js";
import { storeSessionTe } from "../utils/session.js";

interface Dependencies {
  config: Config;
  redisClientFactory: RedisClientFactory;
}

const Body = t.type({
  family_name: NonEmptyString,
  fiscal_code: FiscalCode,
  given_name: NonEmptyString,
  route: enumType<RouteEnum>(RouteEnum, "route"),
});
type Body = t.TypeOf<typeof Body>;

export const getSessionToken =
  (testUser: Session, route: RouteEnum) =>
  (deps: Dependencies): TE.TaskEither<ResponseError, SessionToken> =>
    pipe(
      TE.of(crypto.randomBytes(32).toString("hex")),
      TE.chainFirst((sessionToken) =>
        storeSessionTe(deps.redisClientFactory, sessionToken, testUser),
      ),
      TE.chain((sessionToken) =>
        pipe(toHash(testUser.fiscal_code), (cfHash) =>
          deps.config.TEST_USERS.includes(cfHash)
            ? TE.of({ route, token: sessionToken })
            : TE.left(new Error("User not allowed")),
        ),
      ),
      TE.mapLeft(errorToValidationError),
    );

export const makeTestSessionHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<SessionToken, 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Body, req.body),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(({ route, ...testUser }) =>
      pipe(getSessionToken(testUser, route), RTE.map(H.successJson)),
    ),
    responseErrorToHttpError,
  ),
);

export const TestSessionFn = httpAzureFunction(makeTestSessionHandler);
