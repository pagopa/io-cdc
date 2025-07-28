import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as crypto from "crypto";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import {
  ResponseError,
  errorToInternalError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { OidcClient, getFimsRedirectTE } from "../utils/fims.js";
import { RedisClientFactory } from "../utils/redis.js";
import { setWithExpirationTask } from "../utils/redis_storage.js";

interface Dependencies {
  fimsClient: OidcClient;
  redisClientFactory: RedisClientFactory;
}

export const getFimsRedirect = (
  deps: Dependencies,
): TE.TaskEither<ResponseError, string> =>
  pipe(
    TE.Do,
    TE.bind("state", () => TE.of(crypto.randomBytes(32).toString("hex"))),
    TE.bind("nonce", () => TE.of(crypto.randomBytes(32).toString("hex"))),
    TE.chain(({ nonce, state }) =>
      pipe(
        setWithExpirationTask(deps.redisClientFactory, state, nonce, 60),
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
> = H.of(() =>
  pipe(
    getFimsRedirect,
    RTE.map((redirect) =>
      pipe(H.empty, H.withStatusCode(302), H.withHeader("Location", redirect)),
    ),
    responseErrorToHttpError,
  ),
);

export const FimsAuthFn = httpAzureFunction(makeFimsAuthHandler);
