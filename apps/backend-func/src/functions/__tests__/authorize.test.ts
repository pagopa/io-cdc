import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getRedisClientFactoryMock,
  redisDeleteMock,
  redisGetMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import {
  aValidFiscalCode,
  aValidSession,
  anotherValidFiscalCode,
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { toHash } from "../../utils/hash.js";
import { getSessionToken } from "../authorize.js";

const redisClientFactoryMock = getRedisClientFactoryMock();

const config = {
  DEFAULT_ROUTE: "REGISTRATION",
  TEST_USERS: "",
} as unknown as Config;

describe("getSessionToken", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should retrieve the session token and delete session id if redis client succeed with DEFAULT route REGISTRATION if not test user", async () => {
    redisGetMock.mockResolvedValueOnce("sessiontokenvalue"); // first return sessiontoken
    redisGetMock.mockResolvedValueOnce(undefined); // second return empty route
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession)); // third return session

    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual({
        route: "REGISTRATION" as const,
        token: "sessiontokenvalue",
      });
    }
    expect(redisGetMock).toBeCalledTimes(3);
    expect(redisDeleteMock).toBeCalledTimes(2);
  });

  it("Should retrieve the session token and delete session id if redis client succeed with route REGISTRATION if not test user", async () => {
    redisGetMock.mockResolvedValueOnce("sessiontokenvalue"); // first return sessiontoken
    redisGetMock.mockResolvedValueOnce("REGISTRATION"); // second return route
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession)); // third return session

    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual({
        route: "REGISTRATION" as const,
        token: "sessiontokenvalue",
      });
    }
    expect(redisGetMock).toBeCalledTimes(3);
    expect(redisDeleteMock).toBeCalledTimes(2);
  });

  it("Should retrieve the session token and delete session id if redis client succeed with route USAGE if not test user", async () => {
    redisGetMock.mockResolvedValueOnce("sessiontokenvalue"); // first return sessiontoken
    redisGetMock.mockResolvedValueOnce("USAGE"); // second return route
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession)); // third return session

    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual({
        route: "USAGE" as const,
        token: "sessiontokenvalue",
      });
    }
    expect(redisGetMock).toBeCalledTimes(3);
    expect(redisDeleteMock).toBeCalledTimes(2);
  });

  it("Should retrieve the session token and delete session id if redis client succeed with always route USAGE if test user", async () => {
    config.TEST_USERS = `${toHash(aValidFiscalCode)},${toHash(
      anotherValidFiscalCode,
    )}` as NonEmptyString; // replace TEST_USERS with two hashed fiscal codes separated by comma

    redisGetMock.mockResolvedValueOnce("sessiontokenvalue"); // first return sessiontoken
    redisGetMock.mockResolvedValueOnce("REGISTRATION"); // second return route this will be overridden to USAGE
    redisGetMock.mockResolvedValueOnce(JSON.stringify(aValidSession)); // third return session

    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual({
        route: "USAGE" as const,
        token: "sessiontokenvalue",
      });
    }
    expect(redisGetMock).toBeCalledTimes(3);
    expect(redisDeleteMock).toBeCalledTimes(2);
  });

  it("Should fail with 500 if redis GET fail", async () => {
    redisGetMock.mockRejectedValueOnce("any error");
    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    expect(redisGetMock).toBeCalledTimes(1);
    expect(redisDeleteMock).toBeCalledTimes(0);
    if (E.isLeft(res)) {
      expect(res.left).toEqual({
        code: 500,
        message: "any error",
        title: "Internal Server Error",
      });
    }
  });

  it("Should fail with 401 if redis GET does not find value", async () => {
    redisGetMock.mockResolvedValueOnce(undefined);
    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    expect(redisGetMock).toBeCalledTimes(1);
    expect(redisDeleteMock).toBeCalledTimes(0);
    if (E.isLeft(res)) {
      expect(res.left).toEqual({
        code: 401,
        message: "Session not found",
        title: "Unauthorized",
      });
    }
  });

  it("Should fail with 500 if redis DELETE fail", async () => {
    redisDeleteMock.mockRejectedValueOnce("any error");
    const res = await getSessionToken({ id: "sessionid" as NonEmptyString })({
      config,
      redisClientFactory: redisClientFactoryMock,
    })();
    expect(E.isLeft(res)).toBe(true);
    expect(redisGetMock).toBeCalledTimes(1);
    expect(redisDeleteMock).toBeCalledTimes(1);
    if (E.isLeft(res)) {
      expect(res.left).toEqual({
        code: 500,
        message: "any error",
        title: "Internal Server Error",
      });
    }
  });
});
