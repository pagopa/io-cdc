import { CosmosClient } from "@azure/cosmos";
import * as H from "@pagopa/handler-kit";
import { httpAzureFunction } from "@pagopa/handler-kit-azure-func";
import { IsoDateFromString } from "@pagopa/ts-commons/lib/dates.js";
import { FiscalCode, NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as RTE from "fp-ts/lib/ReaderTaskEither.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import * as A from "fp-ts/lib/Array.js";
import { pipe } from "fp-ts/lib/function.js";
import { ulid } from "ulid";

import { Config } from "../config.js";
import { CosmosDbPendingRequestRepository } from "../repository/pending_request_repository.js";
import { PendingCardRequestMessage } from "../types/queue-message.js";
import {
  errorToInternalError,
  responseErrorToHttpError,
} from "../utils/errors.js";
import { QueueStorage } from "../utils/queue.js";

interface Dependencies {
  config: Config;
  cosmosDbClient: CosmosClient;
  queueStorage: QueueStorage;
}

const generateFakeFiscalCodes = () => {
  // generate random fiscal codes
  let fiscalCodes: FiscalCode[] = [];
  for (let i = 0; i < 10000; i++) {
    const paddedNumber = "000000" + i;
    const tokens: string[] = paddedNumber.split("");
    fiscalCodes.push(
      `SREGPP${tokens.pop()}${tokens.pop()}A${tokens.pop()}${tokens.pop()}G${tokens.pop()}${tokens.pop()}${tokens.pop()}R` as FiscalCode,
    );
  }
  return fiscalCodes;
};

export const saveNewCardRequests = (deps: Dependencies) =>
  pipe(
    TE.of(
      new CosmosDbPendingRequestRepository(
        deps.cosmosDbClient.database(deps.config.COSMOSDB_CDC_DATABASE_NAME),
      ),
    ),
    TE.chain((repository) =>
      pipe(
        generateFakeFiscalCodes(),
        A.map((fiscalCode) =>
          pipe(
            TE.Do,
            TE.bind("requestDate", () =>
              TE.of(new Date() as IsoDateFromString),
            ),
            TE.bind("requestId", () => TE.of(ulid() as NonEmptyString)),
            TE.chain(({ requestDate, requestId }) =>
              pipe(
                repository.insert({
                  fiscalCode,
                  requestDate,
                  requestId,
                  id: ulid() as NonEmptyString,
                  years: ["2020", "2021", "2022"],
                }),
                TE.chain(() =>
                  deps.queueStorage.enqueuePendingCardRequestMessage({
                    fiscal_code: fiscalCode,
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

export const postCardRequests = (deps: Dependencies) =>
  saveNewCardRequests(deps);

export const makeLoadTestHandler: H.Handler<
  H.HttpRequest,
  | H.HttpResponse<string, 201>
  | H.HttpResponse<H.ProblemJson, H.HttpErrorStatusCode>,
  Dependencies
> = H.of(() =>
  pipe(
    postCardRequests,
    RTE.map(() => pipe(H.successJson("gotit!"), H.withStatusCode(201))),
    responseErrorToHttpError,
  ),
);

export const LoadTestFn = httpAzureFunction(makeLoadTestHandler);
