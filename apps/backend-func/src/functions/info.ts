import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as RA from "fp-ts/lib/ReadonlyArray";
import * as Task from "fp-ts/lib/Task";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { Config } from "../config";
import { ApplicationInfo } from "../generated/definitions/internal/ApplicationInfo";
import { getCosmosDbClientInstance } from "../utils/cosmosdb";
import { RedisClientFactory } from "../utils/redis";

type Dependencies = {
  config: Config;
  redisClientFactory: RedisClientFactory;
};

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
    TE.tryCatch(
      () => deps.redisClientFactory.getInstance(),
      toHealthProblems("Redis"),
    ),
    TE.map(() => true),
  );

export const makeInfoHandler: H.Handler<
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
