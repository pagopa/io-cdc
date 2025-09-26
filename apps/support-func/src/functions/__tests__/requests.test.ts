import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CosmosOperation,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import {
  aCardRequest,
  aRequestAudit,
  aValidFiscalCode,
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CosmosDbCardRequestRepository } from "../../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../../repository/request_audit_repository.js";
import { getCitizenRequests } from "../requests.js";

const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;

describe("status | getCitizenRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return 404 if cosmos succeeds with no items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    const res = await getCitizenRequests(aValidFiscalCode)({
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual(expect.objectContaining({ code: 404 }));
  });

  it("1. should return InternalServerError if cosmos fails during fetch", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.fetchAll,
    );
    const res = await getCitizenRequests(aValidFiscalCode)({
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
  });

  it("1. should return Requests if cosmos succeeds with items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbRequestAuditRepository.containerName)([
      aRequestAudit,
    ]);
    setMockedItems(CosmosDbCardRequestRepository.containerName)([aCardRequest]);
    const res = await getCitizenRequests(aValidFiscalCode)({
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual(
        expect.objectContaining([
          {
            request_date: aRequestAudit.requestDate,
            years: [
              { processed: true, year: aRequestAudit.years[0] },
              { processed: false, year: aRequestAudit.years[1] },
              { processed: false, year: aRequestAudit.years[2] },
            ],
          },
        ]),
      );
  });
});
