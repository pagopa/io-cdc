import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import { Config } from "../config";
import { CosmosClient } from "@azure/cosmos";
import { RedisClientFactory } from "../utils/redis";
import { getSessionTE } from "../utils/session";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository";
import { ulid } from "ulid";
import { Year } from "../models/card_request";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(getSessionTE(deps.redisClientFactory, sessionToken));

const postCardRequests =
  (fiscalCode: FiscalCode, years: string[]) => (deps: Dependencies) =>
    pipe(
      TE.of(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) =>
        pipe(
          years,
          A.map((year) => ({
            createdAt: new Date(),
            fiscalCode: fiscalCode,
            id: ulid() as NonEmptyString,
            year: year as Year,
          })),
          A.map((cardRequest) => repository.insert(cardRequest)),
          A.sequence(TE.ApplicativePar),
        ),
      ),
      TE.map(() =>
        pipe(
          years,
          A.map((year) => ({ year })),
        ),
      ),
    );

export const makePostCardRequestsHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<string, 200>,
  undefined
> = H.of((req) =>
  pipe(
    getSession(req.headers.token),
    RTE.chain((user) =>
      postCardRequests(user.fiscal_code, req.body as string[]),
    ),
    RTE.map(() => H.successJson("success")),
  ),
);

export const PostCardRequestsFn = httpAzureFunction(
  makePostCardRequestsHandler,
);
