import { emitCustomEvent } from "@pagopa/azure-tracing/logger";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { isAfter } from "date-fns";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { Years } from "../generated/definitions/internal/Years.js";
import { years } from "../models/card_request.js";
import { responseErrorToHttpError } from "../utils/errors.js";

interface Dependencies {
  config: Config;
}

export const getYears = () => (deps: Dependencies) =>
  pipe(
    new Date(deps.config.CDC_REGISTRATION_END_DATE),
    O.fromPredicate((endDate) => {
      const now = new Date();
      const validDate = isAfter(endDate, now);
      // eslint-disable-next-line no-console
      console.log(
        `Today: ${now.toISOString()} EndDate: ${endDate.toISOString()} => ${
          validDate ? "Iniziative open" : "Initiative closed"
        }`,
      );
      emitCustomEvent("cdc.iniziative.status", {
        data: `Today: ${now.toISOString()} EndDate: ${endDate.toISOString()} => ${
          validDate ? "Iniziative open" : "Initiative closed"
        }`,
      })("getYears");
      return validDate;
    }),
    O.map(() => TE.of(years as Years)),
    O.getOrElse(() => TE.of([] as Years)),
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
    responseErrorToHttpError,
  ),
);

export const GetYearsFn = httpAzureFunction(makeGetYearsHandler);
