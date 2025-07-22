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
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../repository/request_audit_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { CdcApiRequestData, CdcUtils } from "../utils/cdc.js";

interface Dependencies {
  cdcUtils: CdcUtils;
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
    TE.of(
      new CosmosDbRequestAuditRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((requestsAuditRepository) =>
      requestsAuditRepository.getAllByFiscalCode(
        pendingCardRequestMessage.fiscal_code,
      ),
    ),
    TE.map((requestsAudit) =>
      // build request payload
      pipe(
        pendingCardRequestMessage.years,
        A.map((year) =>
          pipe(
            // we check request date from previous audits
            // get smaller date from all requests audits that include this year
            // or get pendingCardRequestMessage.request_date
            requestsAudit
              .filter((req) => req.years.includes(year))
              .map((req) => req.requestDate)
              .sort()
              .shift(),
            O.fromNullable,
            O.getOrElse(() => pendingCardRequestMessage.request_date),
            (requestDate) => ({
              request_date: requestDate,
              year,
            }),
          ),
        ),
      ),
    ),
    // we call CdC API with a cumulative request
    TE.chainFirst((requestData) =>
      pipe(
        deps.cdcUtils.requestCdcTE(
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
  (requestData: CdcApiRequestData) =>
    pipe(
      TE.of(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) =>
        repository.getAllByFiscalCode(pendingCardRequestMessage.fiscal_code),
      ),
      TE.map(A.map((cardRequest) => cardRequest.year)),
      TE.chain((alreadyArchivedYears) =>
        pipe(
          deps.cdcUtils.getAlreadyRequestedYearsCdcTE({
            first_name: pendingCardRequestMessage.first_name,
            fiscal_code: pendingCardRequestMessage.fiscal_code,
            last_name: pendingCardRequestMessage.last_name,
          }),
          TE.map((cdcRequestedYears) =>
            cdcRequestedYears.filter((y) => !alreadyArchivedYears.includes(y)),
          ),
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
              requestData,
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
    RTE.map(() => void 0),
  ),
);

export const ProcessPendingRequestFn = azureFunction(
  ProcessPendingRequestHandler,
);
