import { Container, Database } from "@azure/cosmos";
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { flow, pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";

import { RequestAudit } from "../models/request_audit.js";

interface RequestAuditRepository {
  getAllByFiscalCode: (
    fiscalCode: RequestAudit["fiscalCode"],
  ) => TE.TaskEither<Error, RequestAudit[]>;

  insert: (RequestAudit: RequestAudit) => TE.TaskEither<Error, void>;
}

export class CosmosDbRequestAuditRepository implements RequestAuditRepository {
  static containerName = "requests-audit-test";

  #RequestAuditContainer: Container;

  constructor(db: Database) {
    this.#RequestAuditContainer = db.container(
      CosmosDbRequestAuditRepository.containerName,
    );
  }

  getAllByFiscalCode(
    fiscalCode: RequestAudit["fiscalCode"],
  ): TE.TaskEither<Error, RequestAudit[]> {
    return pipe(
      TE.tryCatch(async () => {
        const { resources: items } = await this.#RequestAuditContainer.items
          .readAll({
            partitionKey: fiscalCode,
          })
          .fetchAll();
        return items;
      }, E.toError),
      TE.chainW(
        flow(
          t.array(RequestAudit).decode,
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

  insert(RequestAudit: RequestAudit) {
    return TE.tryCatch(async () => {
      await this.#RequestAuditContainer.items.create(RequestAudit);
    }, E.toError);
  }
}
