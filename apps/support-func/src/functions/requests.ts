import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as RA from "fp-ts/lib/ReadonlyArray.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { CitizenStatus } from "../generated/cdc-api/CitizenStatus.js";
import { withParams } from "../middlewares/withParams.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import {
  errorToInternalError,
  errorToNotFoundError,
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { CosmosDbRequestAuditRepository } from "../repository/request_audit_repository.js";
import { request } from "http";
import { Requests } from "../generated/definitions/internal/Requests.js";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
}

const Body = t.interface({
  fiscal_code: FiscalCode,
});
type Body = t.TypeOf<typeof Body>;

export const getCitizenRequests =
  (fiscalCode: FiscalCode) => (deps: Dependencies) =>
    pipe(
      TE.Do,
      TE.bind("audits", () =>
        pipe(
          new CosmosDbRequestAuditRepository(
            deps.cosmosDbClient.database(
              deps.config.COSMOSDB_CDC_DATABASE_NAME,
            ),
          ),
          (repository) => repository.getAllByFiscalCode(fiscalCode),
        ),
      ),
      TE.bind("requests", () =>
        pipe(
          new CosmosDbCardRequestRepository(
            deps.cosmosDbClient.database(
              deps.config.COSMOSDB_CDC_DATABASE_NAME,
            ),
          ),
          (repository) => repository.getAllByFiscalCode(fiscalCode),
        ),
      ),
      TE.mapLeft(errorToInternalError),
      TE.chainW(({ audits, requests }) =>
        pipe(
          audits.length > 0
            ? TE.right(
                pipe(
                  audits,
                  RA.map((a) => ({
                    years: a.years.map((y) => ({
                      year: y,
                      processed: requests.some((r) => r.year === y),
                    })),
                    request_date: a.requestDate,
                  })),
                ),
              )
            : TE.left(new Error("No requests found")),
          TE.mapLeft(errorToNotFoundError),
        ),
      ),
    );

export const makeRequestsHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<Requests, 200>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Body, req.body),
    RTE.mapLeft(errorToValidationError),
    RTE.map((body) => body.fiscal_code),
    RTE.chainW(getCitizenRequests),
    RTE.map((status) => pipe(H.successJson(status), H.withStatusCode(200))),
    responseErrorToHttpError,
  ),
);

export const RequestsFn = httpAzureFunction(makeRequestsHandler);
