import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { azureFunction } from "@pagopa/handler-kit-azure-func";
import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { ulid } from "ulid";

import { Config } from "../config.js";
import { Year } from "../models/card_request.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getRandomError } from "../utils/testing.js";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

export const getExistingCardRequests = (
  fiscalCode: FiscalCode,
  deps: Dependencies,
) =>
  pipe(
    TE.of(
      new CosmosDbCardRequestRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
    TE.map(A.map((cardRequest) => cardRequest.year)),
  );

export const filterAlreadyRequestedYears =
  (requestedYears: Year[]) => (alreadyRequestedYears: Year[]) =>
    requestedYears.filter((year) => alreadyRequestedYears.indexOf(year) < 0);

export const saveCardRequests =
  (pendingCardRequestMessage: PendingCardRequestMessage, deps: Dependencies) =>
  (years: Year[]) =>
    pipe(
      TE.of(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain(getRandomError), // TODO: Remove this line when load tests are done
      TE.chain((repository) =>
        pipe(
          years,
          A.map((year) =>
            // TODO: Call sogei api
            repository.insert({
              createdAt: new Date() as IsoDateFromString,
              fiscalCode: pendingCardRequestMessage.fiscal_code,
              id: ulid() as NonEmptyString,
              requestDate: pendingCardRequestMessage.request_date,
              requestId: pendingCardRequestMessage.request_id,
              year,
            }),
          ),
          A.sequence(TE.ApplicativePar),
        ),
      ),
    );

export const processPendingCardRequests =
  (pendingCardRequestMessage: PendingCardRequestMessage) =>
  (deps: Dependencies) =>
    pipe(
      getExistingCardRequests(pendingCardRequestMessage.fiscal_code, deps),
      TE.map(filterAlreadyRequestedYears(pendingCardRequestMessage.years)),
      TE.chain(saveCardRequests(pendingCardRequestMessage, deps)),
    );

export const ProcessPendingRequestHandler: H.Handler<
  PendingCardRequestMessage,
  void,
  Dependencies
> = H.of((pendingCardRequestMessage) =>
  pipe(
    processPendingCardRequests(pendingCardRequestMessage),
    RTE.map(() => void 0),
  ),
);

export const ProcessPendingRequestFn = azureFunction(
  ProcessPendingRequestHandler,
);
