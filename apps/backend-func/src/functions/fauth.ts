import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

import { OidcClient, getFimsRedirectTE } from "../utils/fims.js";
import {
  errorToInternalError,
  ResponseError,
  responseErrorToHttpError,
} from "../utils/errors.js";

interface Dependencies {
  fimsClient: OidcClient;
}

export const getFimsRedirect = (
  deps: Dependencies,
): TE.TaskEither<ResponseError, string> =>
  pipe(getFimsRedirectTE(deps.fimsClient), TE.mapLeft(errorToInternalError));

export const makeFimsAuthHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<null, 302>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  Dependencies
> = H.of(() =>
  pipe(
    getFimsRedirect,
    RTE.map((redirect) =>
      pipe(H.empty, H.withStatusCode(302), H.withHeader("Location", redirect)),
    ),
    responseErrorToHttpError,
  ),
);

export const FimsAuthFn = httpAzureFunction(makeFimsAuthHandler);
