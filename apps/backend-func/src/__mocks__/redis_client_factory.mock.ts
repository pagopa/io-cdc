import { vi } from "vitest";

import { RedisClient, RedisClientFactory } from "../utils/redis.js";

export const redisSetMock = vi.fn().mockResolvedValue("OK");

export const redisSetExMock = vi.fn().mockResolvedValue("OK");

export const redisGetMock = vi.fn().mockResolvedValue("stringified-value");

export const redisExistsMock = vi.fn().mockResolvedValue(1);

export const redisDeleteMock = vi.fn().mockResolvedValue(1);

const redisClient: RedisClient = {
  DEL: redisDeleteMock,
  EXISTS: redisExistsMock,
  GET: redisGetMock,
  SET: redisSetMock,
  SETEX: redisSetExMock,
} as unknown as RedisClient;

const redisClientFactory: RedisClientFactory = {
  getInstance: async () => redisClient,
} as RedisClientFactory;

export const getRedisClientFactoryMock = () => redisClientFactory;
