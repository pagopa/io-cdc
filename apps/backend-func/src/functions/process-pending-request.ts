import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { azureFunction } from "@pagopa/handler-kit-azure-func";
import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { ulid } from "ulid";

import { Config } from "../config.js";
import { Year } from "../models/card_request.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../repository/request_audit_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import { CdcUtils } from "../utils/cdc.js";

interface Dependencies {
  cdcUtils: CdcUtils;
  config: Config;
  cosmosDbClient: CosmosClient;
}

export const getExistingCardRequests = (
  pendingCardRequestMessage: PendingCardRequestMessage,
  deps: Dependencies,
) =>
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
    TE.chain((alreadyRequestedYears) =>
      pipe(
        deps.cdcUtils.getAlreadyRequestedYearsCdcTE({
          first_name: pendingCardRequestMessage.first_name,
          fiscal_code: pendingCardRequestMessage.fiscal_code,
          last_name: pendingCardRequestMessage.last_name,
        }),
        TE.map((alreadyRequestedYearsCdc) =>
          // we merge the years we know with years that cdc api knows and deduplicate
          [...new Set(alreadyRequestedYears.concat(alreadyRequestedYearsCdc))],
        ),
      ),
    ),
  );

export const filterAlreadyRequestedYears =
  (requestedYears: Year[]) => (alreadyRequestedYears: Year[]) =>
    requestedYears.filter((year) => alreadyRequestedYears.indexOf(year) < 0);

export const saveCardRequests =
  (pendingCardRequestMessage: PendingCardRequestMessage, deps: Dependencies) =>
  (years: Year[]) =>
    pipe(
      TE.Do,
      TE.bind("cardRequestsRepository", () =>
        TE.of(
          new CosmosDbCardRequestRepository(
            deps.cosmosDbClient.database(
              deps.config.COSMOSDB_CDC_DATABASE_NAME,
            ),
          ),
        ),
      ),
      TE.bind("requestsAudit", () =>
        pipe(
          TE.of(
            new CosmosDbRequestAuditRepository(
              deps.cosmosDbClient.database(
                deps.config.COSMOSDB_CDC_DATABASE_NAME,
              ),
            ),
          ),
          TE.chain((requestsAuditRepository) =>
            requestsAuditRepository.getAllByFiscalCode(
              pendingCardRequestMessage.fiscal_code,
            ),
          ),
        ),
      ),
      TE.chain(({ cardRequestsRepository, requestsAudit }) =>
        pipe(
          years,
          A.map((year) =>
            pipe(
              TE.of(requestsAudit),
              // we check request date from previous audit
              TE.map((requests) =>
                pipe(
                  // get smaller date from all requests audits that include this year
                  // or get pendingCardRequestMessage.request_date
                  requests
                    .filter((req) => req.years.includes(year))
                    .map((req) => req.requestDate)
                    .sort()
                    .shift(),
                  O.fromNullable,
                  O.getOrElse(() => pendingCardRequestMessage.request_date),
                ),
              ),
              // we call sogei
              TE.chainFirst((requestDate) =>
                deps.cdcUtils.requestCdcTE(
                  {
                    first_name: pendingCardRequestMessage.first_name,
                    fiscal_code: pendingCardRequestMessage.fiscal_code,
                    last_name: pendingCardRequestMessage.last_name,
                  },
                  {
                    request_date: requestDate,
                    years: [year],
                  },
                ),
              ),
              // we save requests on our end
              TE.chain((requestDate) =>
                cardRequestsRepository.insert({
                  createdAt: new Date() as IsoDateFromString,
                  fiscalCode: pendingCardRequestMessage.fiscal_code,
                  id: ulid() as NonEmptyString,
                  requestDate,
                  requestId: pendingCardRequestMessage.request_id,
                  year,
                }),
              ),
            ),
          ),
          A.sequence(TE.ApplicativePar),
        ),
      ),
      TE.map(() => true as const),
    );

export const processPendingCardRequests =
  (pendingCardRequestMessage: PendingCardRequestMessage) =>
  (deps: Dependencies) =>
    pipe(
      getExistingCardRequests(pendingCardRequestMessage, deps),
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
