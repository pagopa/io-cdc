import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings";
import * as A from "fp-ts/Array";
import * as TE from "fp-ts/TaskEither";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";
import { ulid } from "ulid";

import { Config } from "../config";
import { CardRequests } from "../generated/definitions/internal/CardRequests";
import { Year, years } from "../models/card_request";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository";
import { RedisClientFactory } from "../utils/redis";
import { getSessionTE } from "../utils/session";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(getSessionTE(deps.redisClientFactory, sessionToken));

const getExistingCardRequests = (fiscalCode: FiscalCode, deps: Dependencies) =>
  pipe(
    TE.of(
      new CosmosDbCardRequestRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
    TE.map(A.map((cardRequest) => cardRequest.year)),
  );

const filterNotEligibleYears =
  (requestedYears: Year[]) =>
    requestedYears.filter(
      (year) => years.lastIndexOf(year) < 0,
    );

const filterAlreadyRequestedYears =
  (requestedYears: Year[]) => (alreadyRequestedYears: Year[]) =>
    requestedYears.filter(
      (year) => alreadyRequestedYears.lastIndexOf(year) < 0,
    );

const saveNewCardRequests =
  (fiscalCode: FiscalCode, deps: Dependencies) => (years: Year[]) =>
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
            year: year,
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

const postCardRequests =
  (fiscalCode: FiscalCode, years: Year[]) => (deps: Dependencies) =>
    pipe(
      getExistingCardRequests(fiscalCode, deps),
      TE.map(filterNotEligibleYears),
      TE.map(filterAlreadyRequestedYears(years)),
      // TODO: Send requests to external party
      TE.chain(saveNewCardRequests(fiscalCode, deps)),
    );

export const makePostCardRequestsHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<CardRequests, 201>,
  Dependencies
> = H.of((req) =>
  pipe(
    getSession(req.headers.token),
    RTE.chain((user) => postCardRequests(user.fiscal_code, req.body as Year[])),
    RTE.map((years) => pipe(H.successJson(years), H.withStatusCode(201))),
  ),
);

export const PostCardRequestsFn = httpAzureFunction(
  makePostCardRequestsHandler,
);
