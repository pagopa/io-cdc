import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { Config } from "../config";
import { CosmosClient } from "@azure/cosmos";
import { RedisClientFactory } from "../utils/redis";
import { getSessionTE } from "../utils/session";
import { FiscalCode } from "@pagopa/ts-commons/lib/strings";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(getSessionTE(deps.redisClientFactory, sessionToken));

const postCardRequests = (fiscalCode: FiscalCode, years: string[]) => (deps: Dependencies) =>
  pipe(
    TE.of(
      new CosmosDbCardRequestRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
    TE.map(A.map((cardRequest) => ({ year: cardRequest.year }))),
  );

export const makePostCardRequestsHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<string, 200>,
  undefined
> = H.of(() =>
  pipe(
    RTE.of(true),
    RTE.map(() => H.successJson("success")),
  ),
);

export const PostCardRequestsFn = httpAzureFunction(
  makePostCardRequestsHandler,
);
