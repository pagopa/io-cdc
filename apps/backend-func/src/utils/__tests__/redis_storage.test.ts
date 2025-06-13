import * as E from "fp-ts/lib/Either.js";
import * as O from "fp-ts/lib/Option.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getRedisClientFactoryMock,
  redisDeleteMock,
  redisExistsMock,
  redisGetMock,
  redisSetExMock,
  redisSetMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import {
  deleteTask,
  existsKeyTask,
  getTask,
  setTask,
  setWithExpirationTask,
} from "../redis_storage.js";

const redisClientFactoryMock = getRedisClientFactoryMock();

describe("Redis client working", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return right when SET works", async () => {
    const res = await setTask(redisClientFactoryMock, "key", "value")();
    expect(E.isRight(res)).toBe(true);
  });

  it("Should return right when SETEX works", async () => {
    const res = await setWithExpirationTask(
      redisClientFactoryMock,
      "key",
      "value",
      10,
    )();
    expect(E.isRight(res)).toBe(true);
  });

  it("Should return right when GET works", async () => {
    const res = await getTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
  });

  it("Should return right when EXISTS works", async () => {
    const res = await existsKeyTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
  });

  it("Should return right when DEL works", async () => {
    const res = await deleteTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
  });
});

describe("Redis client failing", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return left when SET fails", async () => {
    redisSetMock.mockRejectedValueOnce("Error");
    const res = await setTask(redisClientFactoryMock, "key", "value")();
    expect(E.isLeft(res)).toBe(true);
  });

  it("Should return left when SETEX fails", async () => {
    redisSetExMock.mockRejectedValueOnce("Error");
    const res = await setWithExpirationTask(
      redisClientFactoryMock,
      "key",
      "value",
      10,
    )();
    expect(E.isLeft(res)).toBe(true);
  });

  it("Should return left when GET fails", async () => {
    redisGetMock.mockRejectedValueOnce("Error");
    const res = await getTask(redisClientFactoryMock, "key")();
    expect(E.isLeft(res)).toBe(true);
  });

  it("Should return left when EXISTS fails", async () => {
    redisExistsMock.mockRejectedValueOnce("Error");
    const res = await existsKeyTask(redisClientFactoryMock, "key")();
    expect(E.isLeft(res)).toBe(true);
  });

  it("Should return left when DEL fails", async () => {
    redisDeleteMock.mockRejectedValueOnce("Error");
    const res = await deleteTask(redisClientFactoryMock, "key")();
    expect(E.isLeft(res)).toBe(true);
  });
});

describe("Redis client results", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should return right with boolean true result when SET works", async () => {
    const res = await setTask(redisClientFactoryMock, "key", "value")();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toBe(true);
  });

  it("Should return right with boolean true result when SETEX works", async () => {
    const res = await setWithExpirationTask(
      redisClientFactoryMock,
      "key",
      "value",
      10,
    )();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toBe(true);
  });

  it("Should return right with valued Option result when GET works and value exists", async () => {
    const res = await getTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(O.isSome(res.right)).toBe(true);
  });

  it("Should return right with empty Option result when GET works and value does not exists", async () => {
    redisGetMock.mockResolvedValueOnce(undefined);
    const res = await getTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(O.isNone(res.right)).toBe(true);
  });

  it("Should return right with boolean true result when EXISTS works", async () => {
    const res = await existsKeyTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toBe(true);
  });

  it("Should return right with boolean true result when DEL works", async () => {
    const res = await deleteTask(redisClientFactoryMock, "key")();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toBe(true);
  });
});
