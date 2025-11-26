import { emitCustomEvent } from "@pagopa/azure-tracing/logger";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import { isAfter } from "date-fns";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { CitizenStatus } from "../generated/definitions/internal/CitizenStatus.js";
import { withParams } from "../middlewares/withParams.js";
import { CdcClientEnvironmentRouter, isTestUser } from "../utils/env_router.js";
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

export const checkStartDatetime =
  (fiscalCode: FiscalCode) => (deps: Dependencies) =>
    pipe(
      new Date(deps.config.CDC_USAGE_START_DATE),
      TE.fromPredicate(
        (startDate) => {
          const testUser = isTestUser(deps.config, fiscalCode);
          const now = new Date();
          const validDate = isAfter(now, startDate) || testUser;
          emitCustomEvent("cdc.get.cards.iniziative.status", {
            data: `Now: ${now.toISOString()} StartDate: ${startDate.toISOString()} => ${
              validDate ? "Iniziative open" : "Initiative closed"
            }`,
          })("getCards");
          if (testUser) {
            emitCustomEvent("cdc.get.status.iniziative.status.test", {
              data: `Test user connected`,
            })("getCitizenStatus");
          }
          return validDate;
        },
        () => new Error("CDC usage period is not started yet"),
      ),
      TE.mapLeft(errorToNotFoundError),
    );

export const checkEndDatetime = (deps: Dependencies) =>
  pipe(
    new Date(deps.config.CDC_USAGE_END_DATE),
    TE.fromPredicate(
      (endDate) => {
        const now = new Date();
        const validDate = isAfter(endDate, now);
        emitCustomEvent("cdc.get.status.iniziative.status", {
          data: `Now: ${now.toISOString()} EndDate: ${endDate.toISOString()} => ${
            validDate ? "Iniziative open" : "Initiative closed"
          }`,
        })("getCitizenStatus");
        return validDate;
      },
      () => new Error("CDC usage period is over"),
    ),
    TE.mapLeft(errorToNotFoundError),
  );

export const getCitizenStatus =
  (fiscalCode: FiscalCode) => (deps: Dependencies) =>
    pipe(
      checkStartDatetime(fiscalCode)(deps),
      TE.chain(() => checkEndDatetime(deps)),
      TE.chain(() =>
        pipe(
          deps.cdcClientEnvironmentRouter.getClient(fiscalCode),
          (cdcUtils) =>
            cdcUtils.getAlreadyRequestedYearsCdcTE({
              first_name: "anyfirstname" as NonEmptyString, // we do not know first name here, GET will still work
              fiscal_code: fiscalCode,
              last_name: "anylastname" as NonEmptyString, // we do not know last name here, GET will still work
            }),
          TE.mapLeft(errorToInternalError),
        ),
      ),
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
