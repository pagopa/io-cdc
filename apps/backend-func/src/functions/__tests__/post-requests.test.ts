import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CosmosOperation,
  clearContainersItems,
  createMocks,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import {
  enqueueMessageMock,
  queueStorageMock,
} from "../../__mocks__/queue.mock.js";
import {
  getRedisClientFactoryMock,
  redisGetMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import { servicesClientMock } from "../../__mocks__/services.mock.js";
import {
  aCardRequest,
  aValidFiscalCode,
  aValidSession,
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CosmosDbCardRequestRepository } from "../../repository/card_request_repository.js";
import { CosmosDbRequestAuditRepository } from "../../repository/request_audit_repository.js";
import {
  filterAlreadyRequestedYears,
  filterNotEligibleYears,
  getExistingCardRequests,
  getSession,
  postCardRequests,
  saveNewRequestAudit,
} from "../post-requests.js";

const redisClientFactoryMock = getRedisClientFactoryMock();
const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;
const servicesClient = servicesClientMock;

describe("post-requests | getSession", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return aValidSession if redis GET succeeds", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession));
    const res = await getSession("sessiontoken")({
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(aValidSession);
  });

  it("should return 401 if redis GET succeeds but no session found", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    redisGetMock.mockResolvedValueOnce(undefined);
    const res = await getSession("sessiontoken")({
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Session not found",
        title: "Unauthorized",
      });
  });
});

describe("post-requests | getExistingCardRequests", () => {
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
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })()();
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
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })()();
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
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })()();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
  });
});

describe("post-requests | filterNotEligibleYears", () => {
  it("should filter not eligible years", async () => {
    //@ts-expect-error to allow sending a not eligible year
    const res = filterNotEligibleYears(["2020", "2021", "2028"]);
    expect(res).toEqual(["2020", "2021"]);
  });
});

describe("post-requests | filterAlreadyRequestedYears", () => {
  it("should filter already requested years", async () => {
    const res = filterAlreadyRequestedYears(["2020", "2021", "2023", "2024"])([
      "2020",
      "2021",
    ]);
    expect(res).toEqual(["2023", "2024"]);
  });
});

describe("post-requests | saveNewCardRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("2. saveNewCards | should return an array of CardRequests' years if cosmos succeeds", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    const res = await saveNewRequestAudit(aValidSession, {
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })(["2020", "2021"])();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual([{ year: "2020" }, { year: "2021" }]);
    expect(
      createMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(enqueueMessageMock).toBeCalledTimes(1);
  });

  it("2. should return InternalServerError if cosmos fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbRequestAuditRepository.containerName,
      CosmosOperation.create,
    );
    const res = await saveNewRequestAudit(aValidSession, {
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })(["2020", "2021"])();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
    expect(
      createMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(enqueueMessageMock).toBeCalledTimes(0);
  });

  it("2. should return InternalServerError if queue storage fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    enqueueMessageMock.mockImplementationOnce(() =>
      TE.left(new Error("Error")),
    );
    const res = await saveNewRequestAudit(aValidSession, {
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })(["2020", "2021"])();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
    expect(
      createMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(enqueueMessageMock).toBeCalledTimes(1);
  });
});

describe("post-requests | postCardRequests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("3. postCardRquests | should return an array of CardRequests' years if cosmos succeeds", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    clearContainersItems(CosmosDbCardRequestRepository.containerName);
    const res = await postCardRequests(aValidSession, ["2020", "2021"])({
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })();
    if (E.isRight(res))
      expect(res.right).toEqual([{ year: "2020" }, { year: "2021" }]);
    expect(
      createMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(enqueueMessageMock).toBeCalledTimes(1);
  });

  it("3. postCardRquests | should not call sogei if all the request audit years has already been processed", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
      CosmosDbRequestAuditRepository.containerName,
    ]);
    clearContainersItems(CosmosDbCardRequestRepository.containerName);
    setMockedItems(CosmosDbCardRequestRepository.containerName)([aCardRequest]);
    const res = await postCardRequests(aValidSession, ["2020"])({
      config,
      cosmosDbClient: cosmosClientMock,
      queueStorage: queueStorageMock,
      redisClientFactory: redisClientFactoryMock,
      servicesClient,
    })();
    if (E.isRight(res)) expect(res.right).toEqual([]);
    expect(
      createMocks[CosmosDbRequestAuditRepository.containerName],
    ).toBeCalledTimes(1);
    expect(enqueueMessageMock).toBeCalledTimes(0);
  });
});
