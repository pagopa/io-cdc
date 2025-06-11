import * as E from "fp-ts/Either";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getRedisClientFactoryMock,
  redisGetMock,
  redisSetExMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import { aValidSession } from "../../__mocks__/types.mock.js";
import { getSessionTE, storeSessionTe } from "../session.js";

const redisClientFactoryMock = getRedisClientFactoryMock();

describe("Session | Redis client working", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should store a Session when SETEX works", async () => {
    const res = await storeSessionTe(
      redisClientFactoryMock,
      "token",
      aValidSession,
    )();
    expect(E.isRight(res)).toBe(true);
  });

  it("Should get a Session when GET works", async () => {
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession));
    const res = await getSessionTE(redisClientFactoryMock, "token")();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(aValidSession);
  });
});

describe("Session | Redis client not working", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return Error in storing session when SETEX does not works", async () => {
    redisSetExMock.mockRejectedValueOnce("error");
    const res = await storeSessionTe(
      redisClientFactoryMock,
      "token",
      aValidSession,
    )();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left instanceof Error).toBe(true);
  });

  it("Should return Error in getting session when GET does not works", async () => {
    redisGetMock.mockRejectedValueOnce("error");
    const res = await getSessionTE(redisClientFactoryMock, "token")();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res)) expect(res.left instanceof Error).toBe(true);
  });
});
