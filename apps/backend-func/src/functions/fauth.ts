import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as crypto from "crypto";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { withParams } from "../middlewares/withParams.js";
import {
  ResponseError,
  errorToInternalError,
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { OidcClient, getFimsRedirectTE } from "../utils/fims.js";
import { RedisClientFactory } from "../utils/redis.js";
import { setWithExpirationTask } from "../utils/redis_storage.js";

interface Dependencies {
  fimsClient: OidcClient;
  redisClientFactory: RedisClientFactory;
}

const QueryParams = t.partial({
  device: NonEmptyString,
});
type QueryParams = t.TypeOf<typeof QueryParams>;

export const getFimsRedirect =
  (device?: string) =>
  (deps: Dependencies): TE.TaskEither<ResponseError, string> =>
    pipe(
      TE.Do,
      TE.bind("state", () => TE.of(crypto.randomBytes(32).toString("hex"))),
      TE.bind("nonce", () => TE.of(crypto.randomBytes(32).toString("hex"))),
      TE.chain(({ nonce, state }) =>
        pipe(
          // store nonce in redis
          setWithExpirationTask(deps.redisClientFactory, state, nonce, 30),
          TE.chain(() =>
            // store device in redis if provided
            pipe(
              device,
              O.fromNullable,
              O.map((device) =>
                setWithExpirationTask(
                  deps.redisClientFactory,
                  `device-${state}`,
                  device,
                  30,
                ),
              ),
              O.getOrElse(() => TE.of(true)),
            ),
          ),
          // get FIMS redirect URL
          TE.chain(() => getFimsRedirectTE(deps.fimsClient, state, nonce)),
        ),
      ),
      TE.mapLeft(errorToInternalError),
    );

export const makeFimsAuthHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<null, 302>,
  Dependencies
> = H.of((req) =>
  pipe(
    TE.Do,
    TE.bind("query", withParams(QueryParams, req.query)),
    TE.mapLeft(errorToValidationError),
    RTE.fromTaskEither,
    RTE.chain(({ query }) => getFimsRedirect(query.device)),
    RTE.map((redirect) =>
      pipe(H.empty, H.withStatusCode(302), H.withHeader("Location", redirect)),
    ),
    responseErrorToHttpError,
  ),
);

export const FimsAuthFn = httpAzureFunction(makeFimsAuthHandler);
