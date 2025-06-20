import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import { authorizationUrlMock, getFimsClient } from "../../__mocks__/fims.mock.js";
import { anOidcConfig } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { getFimsRedirect } from "../fauth.js";
import {
  getRedisClientFactoryMock,
  redisSetExMock,
} from "../../__mocks__/redis_client_factory.mock.js";

const redisClientFactoryMock = getRedisClientFactoryMock();

describe("getFimsRedirect", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return a redirect url when fims client succeed", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);
    const res = await getFimsRedirect({
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toBe("http://fims.it/auth");
    expect(redisSetExMock).toBeCalledTimes(1);
  });

  it("should return an Error when redis client fails", async () => {
    redisSetExMock.mockRejectedValueOnce("Error");
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);
    const res = await getFimsRedirect({
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
    expect(redisSetExMock).toBeCalledTimes(1);
  });

  it("should return an Error when fims client fails", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);
    authorizationUrlMock.mockRejectedValueOnce("Error");
    const res = await getFimsRedirect({
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
    expect(redisSetExMock).toBeCalledTimes(1);
  });
});
