import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { ulid } from "ulid";

import { Config } from "../config.js";
import { CardRequests } from "../generated/definitions/internal/CardRequests.js";
import { Year, years } from "../models/card_request.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { RedisClientFactory } from "../utils/redis.js";
import { getSessionTE } from "../utils/session.js";
import * as t from "io-ts";
import { withParams } from "../middlewares/withParams.js";
import {
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  redisClientFactory: RedisClientFactory;
}

const Headers = t.type({
  token: NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

const Body = t.array(Year);
type Body = t.TypeOf<typeof Body>;

const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Session")),
  );

const getExistingCardRequests = (fiscalCode: FiscalCode, deps: Dependencies) =>
  pipe(
    TE.of(
      new CosmosDbCardRequestRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((repository) => repository.getAllByFiscalCode(fiscalCode)),
    TE.map(A.map((cardRequest) => cardRequest.year)),
    TE.mapLeft(errorToInternalError),
  );

const filterNotEligibleYears = (requestedYears: Year[]) =>
  requestedYears.filter((year) => years.lastIndexOf(year) < 0);

const filterAlreadyRequestedYears =
  (requestedYears: Year[]) => (alreadyRequestedYears: Year[]) =>
    requestedYears.filter(
      (year) => alreadyRequestedYears.lastIndexOf(year) < 0,
    );

const saveNewCardRequests =
  (fiscalCode: FiscalCode, deps: Dependencies) => (years: Year[]) =>
    pipe(
      TE.of(
        new CosmosDbCardRequestRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) =>
        pipe(
          years,
          A.map((year) => ({
            createdAt: new Date(),
            fiscalCode: fiscalCode,
            id: ulid() as NonEmptyString,
            year: year,
          })),
          A.map((cardRequest) => repository.insert(cardRequest)),
          A.sequence(TE.ApplicativePar),
        ),
      ),
      TE.map(() =>
        pipe(
          years,
          A.map((year) => ({ year })),
        ),
      ),
      TE.mapLeft(errorToInternalError),
    );

const postCardRequests =
  (fiscalCode: FiscalCode, years: Year[]) => (deps: Dependencies) =>
    pipe(
      getExistingCardRequests(fiscalCode, deps),
      TE.map(filterNotEligibleYears),
      TE.map(filterAlreadyRequestedYears(years)),
      // TODO: Send requests to external party
      TE.chain(saveNewCardRequests(fiscalCode, deps)),
    );

export const makePostCardRequestsHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<CardRequests, 201>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(Headers, req.headers),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(({ token }) => getSession(token)),
    RTE.chainW((user) =>
      pipe(
        withParams(Body, req.body),
        RTE.mapLeft(errorToValidationError),
        RTE.map((years) => ({ user, years })),
      ),
    ),
    RTE.chain(({ user, years }) => postCardRequests(user.fiscal_code, years)),
    RTE.map((years) => pipe(H.successJson(years), H.withStatusCode(201))),
    responseErrorToHttpError,
  ),
);

export const PostCardRequestsFn = httpAzureFunction(
  makePostCardRequestsHandler,
);
