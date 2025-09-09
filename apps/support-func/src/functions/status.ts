import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { CitizenStatus } from "../generated/cdc-api/CitizenStatus.js";
import { withParams } from "../middlewares/withParams.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { CdcUtils } from "../utils/cdc.js";
import {
  errorToInternalError,
  errorToNotFoundError,
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";

interface Dependencies {
  cdcUtils: CdcUtils;
  config: Config;
  cosmosDbClient: CosmosClient;
}

const Body = t.interface({
  fiscalCode: FiscalCode,
});
type Body = t.TypeOf<typeof Body>;

export const getCitizenStatus =
  (fiscalCode: FiscalCode) => (deps: Dependencies) =>
    pipe(
      TE.of(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
      TE.mapLeft(errorToInternalError),
      TE.chainW((cardRequests) =>
        pipe(
          // if requests are found we return a dummy status with the number of requests found
          // TODO: replace with actual CDC API call
          cardRequests.length > 0
            ? TE.right({
                expiration_date: new Date(),
                number_of_cards: cardRequests.length,
              })
            : TE.left(new Error("No cards found")),
          TE.mapLeft(errorToNotFoundError),
        ),
      ),
    );

export const makeStatusHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<CitizenStatus, 200>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Body, req.body),
    RTE.mapLeft(errorToValidationError),
    RTE.map((body) => body.fiscalCode),
    RTE.chainW(getCitizenStatus),
    RTE.map((status) => pipe(H.successJson(status), H.withStatusCode(200))),
    responseErrorToHttpError,
  ),
);

export const StatusFn = httpAzureFunction(makeStatusHandler);
