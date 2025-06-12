import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  cosmosFetchAllMock,
  getCosmosDbClientInstanceMock,
  setMockedItems,
} from "../../__mocks__/cosmosdb.mock";
import {
  getRedisClientFactoryMock,
  redisGetMock,
} from "../../__mocks__/redis_client_factory.mock";
import {
  aCardRequest,
  aValidFiscalCode,
  aValidSession,
} from "../../__mocks__/types.mock";
import { Config } from "../../config";
import { getCardRequests, getSession } from "../get-requests";

const redisClientFactoryMock = getRedisClientFactoryMock();
const config = {
  COSMOSDB_CDC_DATABASE_NAME: "database",
} as unknown as Config;
const cosmosClientMock = getCosmosDbClientInstanceMock();

const deps = {
  config,
  cosmosDbClient: cosmosClientMock,
  redisClientFactory: redisClientFactoryMock,
};

describe("get-requests | getSession", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return aValidSession if redis GET succeeds", async () => {
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession));
    const res = await getSession("sessiontoken")(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(aValidSession);
  });

  it("should return 401 if redis GET succeeds but no session found", async () => {
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
    const res = await getCardRequests(aValidFiscalCode)(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual([]);
  });

  it("should return an array of CardRequests' years if cosmos succeeds with items", async () => {
    setMockedItems([aCardRequest]);
    const res = await getCardRequests(aValidFiscalCode)(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual([{ year: aCardRequest.year }]);
  });

  it("should return InternalServerError if cosmos fails", async () => {
    cosmosFetchAllMock.mockRejectedValueOnce("Error");
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
