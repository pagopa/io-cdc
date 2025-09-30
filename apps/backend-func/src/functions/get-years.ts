import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { isAfter, startOfToday } from "date-fns";
import * as O from "fp-ts/lib/Option.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Config } from "../config.js";
import { Years } from "../generated/definitions/internal/Years.js";
import { years } from "../models/card_request.js";
import { responseErrorToHttpError } from "../utils/errors.js";

interface Dependencies {
  config: Config;
}

export const makeGetYearsHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<Years, 200>,
  Dependencies
> = H.of(() =>
  pipe(
    RTE.ask<Dependencies>(),
    RTE.chainW(({ config }) =>
      pipe(
        new Date(config.CDC_REGISTRATION_END_DATE),
        O.fromPredicate((date) => isAfter(date, startOfToday())),
        O.map(() => RTE.of(years as Years)),
        O.getOrElse(() => RTE.of([] as Years)),
      ),
    ),
    RTE.map((years) => H.successJson(years)),
    responseErrorToHttpError,
  ),
);

export const GetYearsFn = httpAzureFunction(makeGetYearsHandler);
