import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

import { RedisClientFactory } from "../utils/redis";

interface Dependencies {
  redisClientFactory: RedisClientFactory;
}

export const makeFimsAuthHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<string, 200>,
  Dependencies
> = H.of(() =>
  pipe(
    RTE.of(true),
    RTE.map(() => H.successJson("success")),
  ),
);

export const FimsAuthFn = httpAzureFunction(makeFimsAuthHandler);
