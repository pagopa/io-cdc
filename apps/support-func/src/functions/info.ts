import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as E from "fp-ts/lib/Either.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as RA from "fp-ts/lib/ReadonlyArray.js";
import * as Task from "fp-ts/lib/Task.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { ApplicationInfo } from "../generated/definitions/internal/ApplicationInfo.js";
import { getCosmosDbClientInstance } from "../utils/cosmosdb.js";

interface Dependencies {
  config: Config;
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
      const client = getCosmosDbClientInstance(deps.config.COSMOSDB_CDC_URI);
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

const makeInfoHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<ApplicationInfo, 200>,
  Dependencies
> = H.of(() =>
  pipe(
    [checkAzureCosmosDbHealth],
    RA.sequence(applicativeValidation),
    RTE.map(() => H.successJson({ name: "it works!", version: "0.0.1" })),
    RTE.mapLeft((problems) => new H.HttpError(problems.join("\n\n"))),
  ),
);

export const InfoFn = httpAzureFunction(makeInfoHandler);
