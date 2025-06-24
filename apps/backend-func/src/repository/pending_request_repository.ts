import { Container, Database } from "@azure/cosmos";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { PendingRequest } from "../models/pending_request.js";

interface PendingRequestRepository {
  getAllByFiscalCode: (
    fiscalCode: PendingRequest["fiscalCode"],
  ) => TE.TaskEither<Error, PendingRequest[]>;

  insert: (pendingRequest: PendingRequest) => TE.TaskEither<Error, void>;
}

export class CosmosDbPendingRequestRepository
  implements PendingRequestRepository
{
  #pendingRequestContainer: Container;

  constructor(db: Database) {
    this.#pendingRequestContainer = db.container("pending-requests");
  }

  getAllByFiscalCode(
    fiscalCode: PendingRequest["fiscalCode"],
  ): TE.TaskEither<Error, PendingRequest[]> {
    return pipe(
      TE.tryCatch(async () => {
        const { resources: items } = await this.#pendingRequestContainer.items
          .readAll({
            partitionKey: fiscalCode,
          })
          .fetchAll();
        return items;
      }, E.toError),
      TE.chainW(
        flow(
          t.array(PendingRequest).decode,
          E.mapLeft(
            () =>
              new Error(
                "Error getting pending requests: invalid result format",
              ),
          ),
          TE.fromEither,
        ),
      ),
    );
  }

  insert(pendingRequest: PendingRequest) {
    return TE.tryCatch(async () => {
      await this.#pendingRequestContainer.items.create(pendingRequest);
    }, E.toError);
  }
}
