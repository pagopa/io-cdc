import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

export const makeAuthorizeHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<string, 200>,
  undefined
> = H.of(() =>
  pipe(
    RTE.of(true),
    RTE.map(() => H.successJson("success")),
  ),
);

export const AuthorizeFn = httpAzureFunction(makeAuthorizeHandler);
