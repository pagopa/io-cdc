import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CdcUtilsMock } from "../../__mocks__/cdc.mock.js";
import {
  CosmosOperation,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import { aCardRequest, aValidFiscalCode } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CosmosDbCardRequestRepository } from "../../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../../repository/request_audit_repository.js";
import { getCitizenStatus } from "../status.js";

const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;

describe("status | getCitizenStatus", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return 404 if cosmos succeeds with no items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcUtils: CdcUtilsMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual(expect.objectContaining({ code: 404 }));
  });

  it("1. should return a CitizenStatus if cosmos succeeds with items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbCardRequestRepository.containerName)([aCardRequest]);
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcUtils: CdcUtilsMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual(
        expect.objectContaining({
          expiration_date: expect.any(Date),
          number_of_cards: 1,
        }),
      );
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
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcUtils: CdcUtilsMock,
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
});
