import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Years } from "../generated/definitions/internal/Years.js";
import { years } from "../models/card_request.js";
import { responseErrorToHttpError } from "../utils/errors.js";

export const makeGetYearsHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<Years, 200>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  undefined
> = H.of(() => pipe(RTE.of(H.successJson(years)), responseErrorToHttpError));

export const GetYearsFn = httpAzureFunction(makeGetYearsHandler);
