import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";
import { ulid } from "ulid";

import { ServicesAPIClient } from "../clients/services.js";
import { Config } from "../config.js";
import { CardRequests } from "../generated/definitions/internal/CardRequests.js";
import { withParams } from "../middlewares/withParams.js";
import { Year, years } from "../models/card_request.js";
import { Session } from "../models/session.js";
import { CosmosDbCardRequestRepository } from "../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../repository/request_audit_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import {
  errorToInternalError,
  errorToValidationError,
  responseError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { QueueStorage } from "../utils/queue.js";
import { RedisClientFactory } from "../utils/redis.js";
import { activateSpecialServiceIfNotActive } from "../utils/services.js";
import { getSessionTE } from "../utils/session.js";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  queueStorage: QueueStorage;
  redisClientFactory: RedisClientFactory;
  servicesClient: ServicesAPIClient;
}

const Headers = t.type({
  token: NonEmptyString,
});
type Headers = t.TypeOf<typeof Headers>;

const Body = t.array(Year);
type Body = t.TypeOf<typeof Body>;

export const getSession = (sessionToken: string) => (deps: Dependencies) =>
  pipe(
    getSessionTE(deps.redisClientFactory, sessionToken),
    TE.mapLeft(() => responseError(401, "Session not found", "Unauthorized")),
  );

export const activateSpecialService = (
  fiscalCode: FiscalCode,
  deps: Dependencies,
) =>
  pipe(
    activateSpecialServiceIfNotActive(deps.servicesClient, fiscalCode),
    TE.mapLeft(errorToInternalError),
  );

export const getExistingCardRequests =
  (fiscalCode: FiscalCode, deps: Dependencies) => () =>
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

export const filterNotEligibleYears = (requestedYears: Year[]) =>
  requestedYears.filter((year) => years.indexOf(year) >= 0);

export const filterAlreadyRequestedYears =
  (requestedYears: Year[]) => (alreadyRequestedYears: Year[]) =>
    requestedYears.filter((year) => alreadyRequestedYears.indexOf(year) < 0);

export const saveNewRequestAudit =
  (user: Session, deps: Dependencies) => (years: Year[]) =>
    pipe(
      TE.of(
        new CosmosDbRequestAuditRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) =>
        pipe(
          TE.Do,
          TE.bind("requestDate", () => TE.of(new Date() as IsoDateFromString)),
          TE.bind("requestId", () => TE.of(ulid() as NonEmptyString)),
          TE.chain(({ requestDate, requestId }) =>
            pipe(
              repository.insert({
                fiscalCode: user.fiscal_code,
                id: ulid() as NonEmptyString,
                requestDate,
                requestId,
                years: years,
              }),
              TE.chain(() =>
                deps.queueStorage.enqueuePendingCardRequestMessage({
                  first_name: user.given_name,
                  fiscal_code: user.fiscal_code,
                  last_name: user.family_name,
                  request_date: requestDate,
                  request_id: requestId,
                  years: years,
                } as PendingCardRequestMessage),
              ),
            ),
          ),
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

export const postCardRequests =
  (user: Session, years: Year[]) => (deps: Dependencies) =>
    pipe(
      activateSpecialService(user.fiscal_code, deps),
      TE.chain(getExistingCardRequests(user.fiscal_code, deps)),
      TE.map(filterNotEligibleYears),
      TE.map(filterAlreadyRequestedYears(years)),
      TE.chain(saveNewRequestAudit(user, deps)),
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
    RTE.chain(({ user, years }) => postCardRequests(user, years)),
    RTE.map((years) => pipe(H.successJson(years), H.withStatusCode(201))),
    responseErrorToHttpError,
  ),
);

export const PostCardRequestsFn = httpAzureFunction(
  makePostCardRequestsHandler,
);
