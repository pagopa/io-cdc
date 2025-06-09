import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as TE from "fp-ts/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

import { OidcClient, getFimsRedirectTE } from "../utils/fims";
import { RedisClientFactory } from "../utils/redis";

interface Dependencies {
  fimsClient: OidcClient;
  redisClientFactory: RedisClientFactory;
}

export const getFimsRedirect = (
  deps: Dependencies,
): TE.TaskEither<Error, string> => getFimsRedirectTE(deps.fimsClient);

export const makeFimsAuthHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<null, 302>,
  Dependencies
> = H.of(() =>
  pipe(
    getFimsRedirect,
    RTE.map((redirect) =>
      pipe(H.empty, H.withStatusCode(302), H.withHeader("Location", redirect)),
    ),
  ),
);

export const FimsAuthFn = httpAzureFunction(makeFimsAuthHandler);
