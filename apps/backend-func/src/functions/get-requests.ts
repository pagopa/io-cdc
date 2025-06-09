import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import { getSessionTE } from "../utils/session";
import { RedisClientFactory } from "../utils/redis";
import { Config } from "../config";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository";
import { FiscalCode } from "@pagopa/ts-commons/lib/strings";
import { CardRequests } from "../generated/definitions/internal/CardRequests";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(getSessionTE(deps.redisClientFactory, sessionToken));

const getCardRequests = (fiscalCode: FiscalCode) => (deps: Dependencies) =>
  pipe(
    TE.of(
      new CosmosDbCardRequestRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
    TE.map(A.map((cardRequest) => ({ year: cardRequest.year }))),
  );

export const makeGetCardRequestsHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<CardRequests, 200>,
  Dependencies
> = H.of((req) =>
  pipe(
    getSession(req.headers.token),
    RTE.chain((user) => getCardRequests(user.fiscal_code)),
    RTE.map(H.successJson),
  ),
);

export const GetCardRequestsFn = httpAzureFunction(makeGetCardRequestsHandler);
