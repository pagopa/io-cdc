import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import * as RTE from "fp-ts/lib/ReaderTaskEither";
import { pipe } from "fp-ts/lib/function";

interface Dependencies {
  cosmosDbClient: CosmosClient;
}

export const makeGetCardRequestsHandler: H.Handler<
  H.HttpRequest,
  H.HttpResponse<string, 200>,
  Dependencies
> = H.of(() =>
  pipe(
    RTE.of(true),
    RTE.map(() => H.successJson("success")),
  ),
);

export const GetCardRequestsFn = httpAzureFunction(makeGetCardRequestsHandler);
