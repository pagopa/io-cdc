import { emitCustomEvent } from "@pagopa/azure-tracing/logger";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { isAfter } from "date-fns";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { Years } from "../generated/definitions/internal/Years.js";
import { years } from "../models/card_request.js";
import {
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { traceEvent } from "../utils/tracing.js";

interface Dependencies {
  config: Config;
}

export const checkStartDatetime = (deps: Dependencies) =>
  pipe(
    new Date(deps.config.CDC_REGISTRATION_START_DATE),
    TE.fromPredicate(
      (startDate) => {
        const now = new Date();
        const validDate = isAfter(now, startDate);
        emitCustomEvent("cdc.get.years.iniziative.status", {
          data: `Now: ${now.toISOString()} StartDate: ${startDate.toISOString()} => ${
            validDate ? "Iniziative open" : "Initiative closed"
          }`,
        })("getYears");
        return validDate;
      },
      () => new Error("CDC registration period is not started yet"),
    ),
    TE.mapLeft(errorToValidationError),
  );

export const checkEndDatetime = (deps: Dependencies) =>
  pipe(
    new Date(deps.config.CDC_REGISTRATION_END_DATE),
    TE.fromPredicate(
      (endDate) => {
        const now = new Date();
        const validDate = isAfter(endDate, now);
        emitCustomEvent("cdc.get.years.iniziative.status", {
          data: `Now: ${now.toISOString()} EndDate: ${endDate.toISOString()} => ${
            validDate ? "Iniziative open" : "Initiative closed"
          }`,
        })("getYears");
        return validDate;
      },
      () => new Error("CDC registration period is over"),
    ),
    TE.mapLeft(errorToValidationError),
  );

export const getYears = () => (deps: Dependencies) =>
  pipe(
    checkStartDatetime(deps),
    TE.chain(() => checkEndDatetime(deps)),
    TE.map(() => years as Years),
    TE.orElse(() => TE.of([] as Years)),
  );

export const makeGetYearsHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<Years, 200>,
  Dependencies
> = H.of(() =>
  pipe(
    getYears(),
    RTE.map((years) => H.successJson(years)),
    RTE.mapLeft((responseError) =>
      traceEvent(responseError)(
        "get-years",
        "cdc.function.error",
        responseError,
      ),
    ),
    responseErrorToHttpError,
  ),
);

export const GetYearsFn = httpAzureFunction(makeGetYearsHandler);
