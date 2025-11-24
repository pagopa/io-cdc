import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { CitizenStatus } from "../generated/definitions/internal/CitizenStatus.js";
import { withParams } from "../middlewares/withParams.js";
import { CdcClientEnvironmentRouter } from "../utils/env_router.js";
import {
  errorToInternalError,
  errorToNotFoundError,
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";

interface Dependencies {
  cdcClientEnvironmentRouter: CdcClientEnvironmentRouter;
  config: Config;
}

const Body = t.interface({
  fiscal_code: FiscalCode,
});
type Body = t.TypeOf<typeof Body>;

export const getCitizenStatus =
  (fiscalCode: FiscalCode) => (deps: Dependencies) =>
    pipe(
      deps.cdcClientEnvironmentRouter.getClient(fiscalCode),
      (cdcUtils) =>
        cdcUtils.getAlreadyRequestedYearsCdcTE({
          first_name: "anyfirstname" as NonEmptyString, // we do not know first name here, GET will still work
          fiscal_code: fiscalCode,
          last_name: "anylastname" as NonEmptyString, // we do not know last name here, GET will still work
        }),
      TE.mapLeft(errorToInternalError),
      TE.chainW((cardRequests) =>
        pipe(
          cardRequests.length > 0
            ? TE.right({
                expiration_date: new Date(
                  deps.config.CDC_CARDS_EXPIRATION_DATE,
                ),
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
    RTE.map((body) => body.fiscal_code),
    RTE.chainW(getCitizenStatus),
    RTE.map((status) => pipe(H.successJson(status), H.withStatusCode(200))),
    responseErrorToHttpError,
  ),
);

export const StatusFn = httpAzureFunction(makeStatusHandler);
