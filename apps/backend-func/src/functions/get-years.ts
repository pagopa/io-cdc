import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { Years } from "../generated/definitions/internal/Years.js";
import { years } from "../models/card_request.js";

export const makeGetYearsHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<Years, 200>,
  undefined
> = H.of(() => pipe(RTE.of(H.successJson(years))));

export const GetYearsFn = httpAzureFunction(makeGetYearsHandler);
