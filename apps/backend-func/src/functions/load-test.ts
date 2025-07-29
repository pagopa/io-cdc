import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as A from "fp-ts/lib/Array.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";
import { ulid } from "ulid";

import { Config } from "../config.js";
import { withParams } from "../middlewares/withParams.js";
import { CosmosDbRequestAuditRepository } from "../repository/request_audit_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import {
  errorToInternalError,
  errorToValidationError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { generateFakeUsers } from "../utils/fake-generator.js";
import { QueueStorage } from "../utils/queue.js";

const QueryParams = t.type({
  n: t.string,
});
type QueryParams = t.TypeOf<typeof QueryParams>;

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  queueStorage: QueueStorage;
}

export const insertFakeNewCardRequests =
  (params: QueryParams) => (deps: Dependencies) =>
    pipe(
      TE.of(
        new CosmosDbRequestAuditRepository(
          deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
        ),
      ),
      TE.chain((repository) =>
        pipe(
          generateFakeUsers(parseInt(params.n, 10)),
          A.map((fakeUser) =>
            pipe(
              TE.Do,
              TE.bind("requestDate", () =>
                TE.of(new Date() as IsoDateFromString),
              ),
              TE.bind("requestId", () => TE.of(ulid() as NonEmptyString)),
              TE.chain(({ requestDate, requestId }) =>
                pipe(
                  repository.insert({
                    fiscalCode: fakeUser.fiscal_code,
                    id: ulid() as NonEmptyString,
                    requestDate,
                    requestId,
                    years: ["2020", "2021", "2022"],
                  }),
                  TE.chain(() =>
                    deps.queueStorage.enqueuePendingCardRequestMessage({
                      first_name: fakeUser.first_name,
                      fiscal_code: fakeUser.fiscal_code,
                      last_name: fakeUser.last_name,
                      request_date: requestDate,
                      request_id: requestId,
                      years: ["2020", "2021", "2022"],
                    } as PendingCardRequestMessage),
                  ),
                ),
              ),
            ),
          ),
          A.sequence(TE.ApplicativeSeq),
        ),
      ),
      TE.map(() => true as const),
      TE.mapLeft(errorToInternalError),
    );

export const makeLoadTestHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>
  | H.HttpResponse<string, 201>,
  Dependencies
> = H.of((req) =>
  pipe(
    withParams(QueryParams, req.query),
    RTE.mapLeft(errorToValidationError),
    RTE.chain(flow(insertFakeNewCardRequests, RTE.map(H.successJson))),
    RTE.map(() => pipe(H.successJson("gotit!"), H.withStatusCode(201))),
    responseErrorToHttpError,
  ),
);

export const LoadTestFn = httpAzureFunction(makeLoadTestHandler);
