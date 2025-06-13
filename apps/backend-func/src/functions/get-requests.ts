import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { Config } from "../config.js";
import { CardRequests } from "../generated/definitions/internal/CardRequests.js";
import { withParams } from "../middlewares/withParams.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import {
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getSessionTE } from "../utils/session.js";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

const Headers = t.type({
  token: NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

export const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Unauthorized")),
  );

export const getCardRequests =
  (fiscalCode: FiscalCode) => (deps: Dependencies) =>
    pipe(
      TE.of(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
      TE.map(A.map((cardRequest) => ({ year: cardRequest.year }))),
      TE.mapLeft(errorToInternalError),
    );

export const makeGetCardRequestsHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<CardRequests, 200>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Headers, req.headers),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(({ token }) => getSession(token)),
    RTE.chain((user) => getCardRequests(user.fiscal_code)),
    RTE.map(H.successJson),
    responseErrorToHttpError,
  ),
);

export const GetCardRequestsFn = httpAzureFunction(makeGetCardRequestsHandler);
