import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as H from "@pagopa/handler-kit";
import * as E from "fp-ts/Either";
import * as RTE from "fp-ts/ReaderTaskEither";
import * as RA from "fp-ts/ReadonlyArray";
import * as Task from "fp-ts/Task";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";

import { Config } from "../config.js";
import { ApplicationInfo } from "../generated/definitions/internal/ApplicationInfo.js";
import { getCosmosDbClientInstance } from "../utils/cosmosdb.js";
import { RedisClientFactory } from "../utils/redis.js";
import { singleStringReplyAsync } from "../utils/redis_storage.js";

interface Dependencies {
  config: Config;
  redisClientFactory: RedisClientFactory;
}

const applicativeValidation = RTE.getApplicativeReaderTaskValidation(
  Task.ApplicativePar,
  RA.getSemigroup<string>(),
);

const toHealthProblems =
  (source: string) =>
  (e: unknown): readonly string[] => [`${source}|${E.toError(e).message}`];

const checkAzureCosmosDbHealth = (
  deps: Dependencies,
): TE.TaskEither<readonly string[], true> =>
  pipe(
    TE.Do,
    TE.bind("client", () => {
      const client = getCosmosDbClientInstance(
        deps.config.COSMOSDB_CDC_URI,
        deps.config.COSMOSDB_CDC_KEY,
      );
      return TE.right(client);
    }),
    TE.chain(({ client }) =>
      pipe(
        TE.tryCatch(
          () => client.getDatabaseAccount(),
          toHealthProblems("AzureCosmosDB"),
        ),
        TE.chainFirst(() => TE.of(client.dispose())),
      ),
    ),
    TE.map(() => true),
  );

const checkRedisHealth = (
  deps: Dependencies,
): TE.TaskEither<readonly string[], true> =>
  pipe(
    TE.tryCatch(() => deps.redisClientFactory.getInstance(), E.toError),
    TE.chain((client) => TE.tryCatch(() => client.PING("OK"), E.toError)),
    singleStringReplyAsync,
    TE.chain((res) =>
      res ? TE.of(true as const) : TE.left(new Error("Wrong reply")),
    ),
    TE.mapLeft(toHealthProblems("Redis")),
  );

const makeInfoHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<ApplicationInfo, 200>,
  Dependencies
> = H.of(() =>
  pipe(
    [checkAzureCosmosDbHealth, checkRedisHealth],
    RA.sequence(applicativeValidation),
    RTE.map(() => H.successJson({ name: "it works!", version: "0.0.1" })),
    RTE.mapLeft((problems) => new H.HttpError(problems.join("\n\n"))),
  ),
);

export const InfoFn = httpAzureFunction(makeInfoHandler);
