import { Container, Database } from "@azure/cosmos";
import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { flow, pipe } from "fp-ts/function";
import * as t from "io-ts";

import { CardRequest } from "../models/card_request";

interface CardRequestRepository {
  getAllByFiscalCode: (
    fiscalCode: CardRequest["fiscalCode"],
  ) => TE.TaskEither<Error, CardRequest[]>;

  insert: (cardRequest: CardRequest) => TE.TaskEither<Error, void>;
}

export class CosmosDbCardRequestRepository implements CardRequestRepository {
  #cardRequestContainer: Container;

  constructor(db: Database) {
    this.#cardRequestContainer = db.container("card-requests");
  }

  getAllByFiscalCode(
    fiscalCode: CardRequest["fiscalCode"],
  ): TE.TaskEither<Error, CardRequest[]> {
    return pipe(
      TE.tryCatch(async () => {
        const { resources: items } = await this.#cardRequestContainer.items
          .readAll({
            partitionKey: fiscalCode,
          })
          .fetchAll();
        return items;
      }, E.toError),
      TE.chainW(
        flow(
          t.array(CardRequest).decode,
          E.mapLeft(
            () =>
              new Error("Error getting card requests: invalid result format"),
          ),
          TE.fromEither,
        ),
      ),
    );
  }

  insert(cardRequest: CardRequest) {
    return TE.tryCatch(async () => {
      await this.#cardRequestContainer.items.create(cardRequest);
    }, E.toError);
  }
}
