import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CosmosOperation,
  getCosmosDbClientInstanceMock,
  setCosmosErrorMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock.js";
import {
  getRedisClientFactoryMock,
  redisGetMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import {
  aCardRequest,
  aValidFiscalCode,
  aValidSession,
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CosmosDbCardRequestRepository } from "../../repository/card_request_repository.js";
import { getCardRequests, getSession } from "../get-requests.js";

const redisClientFactoryMock = getRedisClientFactoryMock();
const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;

describe("get-requests | getSession", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return aValidSession if redis GET succeeds", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession));
    const res = await getSession("sessiontoken")(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(aValidSession);
  });

  it("should return 401 if redis GET succeeds but no session found", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    redisGetMock.mockResolvedValueOnce(undefined);
    const res = await getSession("sessiontoken")(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Session not found",
        title: "Unauthorized",
      });
  });

  it("should return 401 if redis GET succeeds but invalid session found", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    redisGetMock.mockResolvedValueOnce(
      JSON.stringify({ notASessionField: "nonASessionValue" }),
    );
    const res = await getSession("sessiontoken")(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Session not found",
        title: "Unauthorized",
      });
  });

  it("should return 401 if redis GET fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    redisGetMock.mockRejectedValueOnce("Error");
    const res = await getSession("sessiontoken")(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Session not found",
        title: "Unauthorized",
      });
  });
});

describe("get-requests | getCardRequests", () => {
  it("should return empty array of CardRequests if cosmos succeeds with no items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    const res = await getCardRequests(aValidFiscalCode)(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual([]);
  });

  it("should return an array of CardRequests' years if cosmos succeeds with items", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    setMockedItems(CosmosDbCardRequestRepository.containerName)([aCardRequest]);
    const res = await getCardRequests(aValidFiscalCode)(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual([{ year: aCardRequest.year }]);
  });

  it("should return InternalServerError if cosmos fails", async () => {
    const cosmosClientMock = getCosmosDbClientInstanceMock([
      CosmosDbCardRequestRepository.containerName,
    ]);
    setCosmosErrorMock(
      CosmosDbCardRequestRepository.containerName,
      CosmosOperation.fetchAll,
    );
    const deps = {
      config,
      cosmosDbClient: cosmosClientMock,
      redisClientFactory: redisClientFactoryMock,
    };
    const res = await getCardRequests(aValidFiscalCode)(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
  });
});
