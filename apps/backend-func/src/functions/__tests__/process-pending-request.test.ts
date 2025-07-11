import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CosmosOperation,
  clearContainersItems,
  createMocks,
  fetchAllMocks,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import {
  aCardRequest,
  aPendingCardRequestMessage,
  aRequestAudit,
  aValidFiscalCode,
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CosmosDbCardRequestRepository } from "../../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../../repository/request_audit_repository.js";
import {
  getExistingCardRequests,
  saveCardRequests,
} from "../process-pending-request.js";

const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;

describe("process-pending-requests | getExistingCardRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return empty array of CardRequests if cosmos succeeds with no items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    const res = await getExistingCardRequests(aValidFiscalCode, {
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual([]);
  });

  it("1. should return an array of CardRequests' years if cosmos succeeds with items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbCardRequestRepository.containerName)([aCardRequest]);
    const res = await getExistingCardRequests(aValidFiscalCode, {
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual([aCardRequest.year]);
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
    const res = await getExistingCardRequests(aValidFiscalCode, {
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
  });
});

describe("process-pending-requests | saveCardRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return error when CosmosDbRequestAuditRepository fetchAll fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbRequestAuditRepository.containerName,
      CosmosOperation.fetchAll,
    );
    const res = await saveCardRequests(aPendingCardRequestMessage, {
      config,
      cosmosDbClient: cosmosClientMock,
    })(["2020", "2021", "2023"])();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).not.toBeCalled();
  });

  it("1. should return error when CosmosDbCardRequestRepository create fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.create,
    );
    const res = await saveCardRequests(aPendingCardRequestMessage, {
      config,
      cosmosDbClient: cosmosClientMock,
    })(["2020", "2021", "2023"])();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(3);
  });

  it("1. should succeed and create CardRequests if no previous RequestsAudit are present", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    clearContainersItems(CosmosDbRequestAuditRepository.containerName);
    const res = await saveCardRequests(aPendingCardRequestMessage, {
      config,
      cosmosDbClient: cosmosClientMock,
    })(["2020", "2021", "2023"])();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(true);
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(3);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName].mock.calls[0][0],
    ).toMatchObject({
      fiscalCode: "AAABBB00C00D000E",
      requestDate: new Date("2025-07-12T14:16:49.633Z"),
      requestId: "anystringedid",
    });
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName].mock.calls[1][0],
    ).toMatchObject({
      fiscalCode: "AAABBB00C00D000E",
      requestDate: new Date("2025-07-12T14:16:49.633Z"),
      requestId: "anystringedid",
    });
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName].mock.calls[2][0],
    ).toMatchObject({
      fiscalCode: "AAABBB00C00D000E",
      requestDate: new Date("2025-07-12T14:16:49.633Z"),
      requestId: "anystringedid",
    });
  });

  it("1. should succeed and create CardRequests with previous RequestsAudit request_date if present", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbRequestAuditRepository.containerName)([
      aRequestAudit, // this request audit has request_date "2025-07-11T14:16:49.633Z"
    ]);
    const res = await saveCardRequests(aPendingCardRequestMessage, {
      config,
      cosmosDbClient: cosmosClientMock,
    })(["2020", "2021", "2023"])();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(true);
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(3);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName].mock.calls[0][0],
    ).toMatchObject({
      fiscalCode: "AAABBB00C00D000E",
      requestDate: new Date("2025-07-11T14:16:49.633Z"),
      requestId: "anystringedid",
    });
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName].mock.calls[1][0],
    ).toMatchObject({
      fiscalCode: "AAABBB00C00D000E",
      requestDate: new Date("2025-07-11T14:16:49.633Z"),
      requestId: "anystringedid",
    });
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName].mock.calls[2][0],
    ).toMatchObject({
      fiscalCode: "AAABBB00C00D000E",
      requestDate: new Date("2025-07-11T14:16:49.633Z"),
      requestId: "anystringedid",
    });
  });
});
