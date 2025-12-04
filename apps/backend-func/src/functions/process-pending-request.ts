import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { azureFunction } from "@pagopa/handler-kit-azure-func";
import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { identity, pipe } from "fp-ts/lib/function.js";
import { ulid } from "ulid";

import { Config } from "../config.js";
import { Year } from "../models/card_request.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../repository/request_audit_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { CdcApiRequestData } from "../utils/cdc.js";
import { CdcClientEnvironmentRouter } from "../utils/env_router.js";
import { traceEvent } from "../utils/tracing.js";

interface Dependencies {
  cdcClientEnvironmentRouter: CdcClientEnvironmentRouter;
  config: Config;
  cosmosDbClient: CosmosClient;
}

/**
 * This functions sends a request to the CdC API for the given pending card request message.
 * It retrieves the request audits for the fiscal code, builds the request data based on the years
 * in the pending message, and sends the request to the CdC API.
 * If the request is successful, it returns the request data.
 * If the request fails, it returns an error.
 *
 * Request data could contain a previously done request that we failed to archive.
 * It will be used to archive the requests later.
 *
 * @param pendingCardRequestMessage
 * @param deps
 * @returns
 */
export const sendCdcCardRequests = (
  pendingCardRequestMessage: PendingCardRequestMessage,
  deps: Dependencies,
) =>
  pipe(
    TE.Do,
    TE.bind("requestsAudit", () =>
      pipe(
        new CosmosDbRequestAuditRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
        (requestsAuditRepository) =>
          requestsAuditRepository.getAllByFiscalCode(
            pendingCardRequestMessage.fiscal_code,
          ),
      ),
    ),
    TE.bind("alreadyArchivedYears", () =>
      pipe(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
        (cardRequestsRepository) =>
          cardRequestsRepository.getAllByFiscalCode(
            pendingCardRequestMessage.fiscal_code,
          ),
        TE.map((existingCardRequests) =>
          existingCardRequests.map((r) => r.year),
        ),
      ),
    ),
    TE.map(({ alreadyArchivedYears, requestsAudit }) =>
      // build request payload
      pipe(
        pendingCardRequestMessage.years,
        // filter out years that have already been requested
        A.filter((year) => !alreadyArchivedYears.includes(year)),
        // map years to request data
        A.map((year) =>
          pipe(
            // we check request date from previous audits
            // get smaller date from all requests audits that include this year
            // or get pendingCardRequestMessage.request_date
            requestsAudit
              .filter((req) => req.years.includes(year))
              .map((req) => req.requestDate)
              .sort((a, b) => a.getTime() - b.getTime())
              .shift(),
            O.fromNullable,
            O.getOrElse(() => pendingCardRequestMessage.request_date),
            (requestDate) => ({
              request_date: requestDate,
              year,
            }),
          ),
        ),
        (requestData) => ({
          alreadyArchivedYears,
          requestData,
        }),
      ),
    ),
    // we call CdC API with a cumulative request
    TE.chainFirst(({ requestData }) =>
      pipe(
        deps.cdcClientEnvironmentRouter.getClient(
          pendingCardRequestMessage.fiscal_code,
        ),
        (cdcClient) =>
          cdcClient.requestCdcTE(
            {
              first_name: pendingCardRequestMessage.first_name,
              fiscal_code: pendingCardRequestMessage.fiscal_code,
              last_name: pendingCardRequestMessage.last_name,
            },
            requestData,
          ),
        TE.chain(
          // we check that ALL requested years has been successfully requested
          TE.fromPredicate(identity, () => new Error("CdC API Call failed")),
        ),
      ),
    ),
  );

/**
 * This function archives card requests for the given pending card request message.
 * It retrieves all card requests for the fiscal code, checks which years have already been archived
 * and then archives the years that have not been archived yet.
 *
 * It uses the CdC API to get the years that have already been requested.
 * It then saves the requests singularly in the Cosmos DB.
 *
 * @param pendingCardRequestMessage
 * @param deps
 * @returns
 */
export const archiveCardRequests =
  (pendingCardRequestMessage: PendingCardRequestMessage, deps: Dependencies) =>
  (input: { alreadyArchivedYears: Year[]; requestData: CdcApiRequestData }) =>
    pipe(
      pipe(
        deps.cdcClientEnvironmentRouter.getClient(
          pendingCardRequestMessage.fiscal_code,
        ),
        (cdcClient) =>
          // we check CdC API for all user requested years
          cdcClient.getAlreadyRequestedYearsCdcTE({
            first_name: pendingCardRequestMessage.first_name,
            fiscal_code: pendingCardRequestMessage.fiscal_code,
            last_name: pendingCardRequestMessage.last_name,
          }),
        // we filter out years that have already been archived
        TE.map((cdcRequestedYears) =>
          cdcRequestedYears.filter(
            (y) => !input.alreadyArchivedYears.includes(y),
          ),
        ),
      ),
      TE.map((yearsToArchive) =>
        traceEvent(yearsToArchive)(
          "archiveCardRequests",
          "cdc.process.requests.archiving",
          {
            request_id: pendingCardRequestMessage.request_id,
            years: yearsToArchive,
          },
        ),
      ),
      // we save requests singularly on our end
      TE.chain((yearsToArchive) =>
        pipe(
          TE.of(
            new CosmosDbCardRequestRepository(
              deps.cosmosDbClient.database(
                deps.config.COSMOSDB_CDC_DATABASE_NAME,
              ),
            ),
          ),
          TE.chain((cardRequestsRepository) =>
            pipe(
              input.requestData,
              A.filter((r) => yearsToArchive.includes(r.year)),
              A.map((request) =>
                pipe(
                  cardRequestsRepository.insert({
                    createdAt: new Date() as IsoDateFromString,
                    fiscalCode: pendingCardRequestMessage.fiscal_code,
                    id: ulid() as NonEmptyString,
                    requestDate: request.request_date,
                    requestId: pendingCardRequestMessage.request_id,
                    year: request.year,
                  }),
                  TE.mapLeft((err) =>
                    traceEvent(err)(
                      "archiveCardRequests",
                      "cdc.process.requests.archiving.error",
                      {
                        request_id: pendingCardRequestMessage.request_id,
                        years: request.year,
                      },
                    ),
                  ),
                ),
              ),
              A.sequence(TE.ApplicativePar),
            ),
          ),
        ),
      ),
      TE.map(() => true as const),
    );

export const processPendingCardRequests =
  (pendingCardRequestMessage: PendingCardRequestMessage) =>
  (deps: Dependencies) =>
    pipe(
      sendCdcCardRequests(pendingCardRequestMessage, deps),
      TE.chain(archiveCardRequests(pendingCardRequestMessage, deps)),
    );

export const ProcessPendingRequestHandler: H.Handler<
  PendingCardRequestMessage,
  void,
  Dependencies
> = H.of((pendingCardRequestMessage) =>
  pipe(
    processPendingCardRequests(pendingCardRequestMessage),
    RTE.mapLeft((responseError) =>
      traceEvent(responseError)(
        "process-pending-request",
        "cdc.function.error",
        responseError,
      ),
    ),
    RTE.map(() => void 0),
  ),
);

export const ProcessPendingRequestFn = azureFunction(
  ProcessPendingRequestHandler,
);
