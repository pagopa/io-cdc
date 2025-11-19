/* eslint-disable max-lines-per-function */
import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CdcClientEnvironmentRouterMock,
  getAlreadyRequestedYearsCdcTEMock,
  requestCdcTEMock,
} from "../../__mocks__/cdc.mock.js";
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
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CosmosDbCardRequestRepository } from "../../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../../repository/request_audit_repository.js";
import {
  archiveCardRequests,
  sendCdcCardRequests,
} from "../process-pending-request.js";

const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;

describe("process-pending-requests | sendCdcCardRequests", () => {
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
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(0);
    expect(requestCdcTEMock).toBeCalledTimes(0);
  });

  it("1. should return error when CosmosDbCardRequestRepository fetchAll fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.fetchAll,
    );
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(requestCdcTEMock).toBeCalledTimes(0);
  });

  it("1. should return error when cdcUtils requestCdcTE returns fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    requestCdcTEMock.mockReturnValueOnce(TE.left(new Error("Error")));
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(requestCdcTEMock).toBeCalledTimes(1);
  });

  it("1. should return error when cdcUtils requestCdcTE returns false", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    requestCdcTEMock.mockReturnValueOnce(TE.of(false));
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual(new Error("CdC API Call failed"));
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(requestCdcTEMock).toBeCalledTimes(1);
  });

  it("1. should succeed and return requests data and already requested years if no previous RequestsAudit are present", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    clearContainersItems(CosmosDbRequestAuditRepository.containerName);
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual({
        alreadyArchivedYears: [],
        requestData: [
          {
            request_date: new Date("2025-07-12T14:16:49.633Z"),
            year: "2020",
          },
          {
            request_date: new Date("2025-07-12T14:16:49.633Z"),
            year: "2021",
          },
          {
            request_date: new Date("2025-07-12T14:16:49.633Z"),
            year: "2023",
          },
        ],
      });
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(requestCdcTEMock).toBeCalledTimes(1);
  });

  it("1. should succeed and return requests data and already requested years with previous RequestsAudit request_date if present", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbRequestAuditRepository.containerName)([
      aRequestAudit, // this request audit has request_date "2025-07-11T14:16:49.633Z"
    ]);
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual({
        alreadyArchivedYears: [],
        requestData: [
          {
            request_date: new Date("2025-07-11T14:16:49.633Z"),
            year: "2020",
          },
          {
            request_date: new Date("2025-07-11T14:16:49.633Z"),
            year: "2021",
          },
          {
            request_date: new Date("2025-07-11T14:16:49.633Z"),
            year: "2023",
          },
        ],
      });
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(requestCdcTEMock).toBeCalledTimes(1);
  });

  it("1. should succeed with only not requested cards and return requests data and already requested years if there are CardRequests", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setMockedItems(CosmosDbRequestAuditRepository.containerName)([
      aRequestAudit, // this request audit has request_date "2025-07-11T14:16:49.633Z"
    ]);
    setMockedItems(CosmosDbCardRequestRepository.containerName)([
      aCardRequest, // 2020 was already requested
    ]);
    const res = await sendCdcCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual({
        alreadyArchivedYears: ["2020"],
        requestData: [
          {
            request_date: new Date("2025-07-11T14:16:49.633Z"),
            year: "2021",
          },
          {
            request_date: new Date("2025-07-11T14:16:49.633Z"),
            year: "2023",
          },
        ],
      });
    expect(
      fetchAllMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      fetchAllMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(requestCdcTEMock).toBeCalledTimes(1);
  });
});

describe("process-pending-requests | archiveCardRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("2. should return error when getAlreadyRequestedYearsCdcTEMock fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    getAlreadyRequestedYearsCdcTEMock.mockReturnValueOnce(
      TE.left(new Error("Error")),
    );
    const res = await archiveCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })({
      alreadyArchivedYears: [],
      requestData: [
        {
          request_date: new Date("2025-07-11T14:16:49.633Z"),
          year: "2020",
        },
      ],
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(getAlreadyRequestedYearsCdcTEMock).toBeCalledTimes(1);
  });

  it("2. should return error when CosmosDbCardRequestRepository create fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    getAlreadyRequestedYearsCdcTEMock.mockReturnValueOnce(
      TE.of(["2020", "2021"]),
    );
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.create,
    );
    const res = await archiveCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })({
      alreadyArchivedYears: [],
      requestData: [
        {
          request_date: new Date("2025-07-11T14:16:49.633Z"),
          year: "2020",
        },
      ],
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left).toEqual(new Error("Error"));
    expect(getAlreadyRequestedYearsCdcTEMock).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
  });

  it("2. should return true when a new request has been archived", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    getAlreadyRequestedYearsCdcTEMock.mockReturnValueOnce(
      TE.of(["2020", "2021"]),
    );
    const res = await archiveCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })({
      alreadyArchivedYears: ["2020"],
      requestData: [
        {
          request_date: new Date("2025-07-11T14:16:49.633Z"),
          year: "2020",
        },
        {
          request_date: new Date("2025-07-12T14:16:49.633Z"),
          year: "2021",
        },
      ],
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(true);
    expect(getAlreadyRequestedYearsCdcTEMock).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      fiscalCode: aPendingCardRequestMessage.fiscal_code,
      id: expect.any(String),
      requestDate: new Date("2025-07-12T14:16:49.633Z"),
      requestId: aPendingCardRequestMessage.request_id,
      year: "2021",
    });
  });

  it("2. should return true when a new request and an old request have been archived", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    getAlreadyRequestedYearsCdcTEMock.mockReturnValueOnce(
      TE.of(["2020", "2021"]),
    );
    const res = await archiveCardRequests(aPendingCardRequestMessage, {
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
      cosmosDbClient: cosmosClientMock,
    })({
      alreadyArchivedYears: [],
      requestData: [
        {
          request_date: new Date("2025-07-11T14:16:49.633Z"),
          year: "2020",
        },
        {
          request_date: new Date("2025-07-12T14:16:49.633Z"),
          year: "2021",
        },
      ],
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(true);
    expect(getAlreadyRequestedYearsCdcTEMock).toBeCalledTimes(1);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toBeCalledTimes(2);
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      fiscalCode: aPendingCardRequestMessage.fiscal_code,
      id: expect.any(String),
      requestDate: new Date("2025-07-12T14:16:49.633Z"),
      requestId: aPendingCardRequestMessage.request_id,
      year: "2021",
    });
    expect(
      createMocks[CosmosDbCardRequestRepository.containerName],
    ).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      fiscalCode: aPendingCardRequestMessage.fiscal_code,
      id: expect.any(String),
      requestDate: new Date("2025-07-11T14:16:49.633Z"),
      requestId: aPendingCardRequestMessage.request_id,
      year: "2020",
    });
  });
});
