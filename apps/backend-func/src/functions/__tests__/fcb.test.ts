import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  fimsUserMock,
  getFimsClient,
  userinfoMock,
} from "../../__mocks__/fims.mock.js";
import {
  getRedisClientFactoryMock,
  redisGetMock,
  redisSetExMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import { anOidcConfig } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { OidcUser } from "../../utils/fims.js";
import { createSessionAndRedirect, getFimsData } from "../fcb.js";

const redisClientFactoryMock = getRedisClientFactoryMock();
const config = { CDC_BASE_URL: "https://baseurl.it" } as unknown as Config;

describe("getFimsData", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return fims user data if fims client succeed", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);

    const res = await getFimsData(
      "code",
      "state",
      "iss",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toEqual(fimsUserMock);
  });

  it("should return error if Redis client fails", async () => {
    redisGetMock.mockRejectedValueOnce("Error");

    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);

    const res = await getFimsData(
      "code",
      "state",
      "iss",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Cannot retrieve user data | Error",
        title: "Unauthorized",
      });
  });

  it("should return error if nonce not found on Redis", async () => {
    redisGetMock.mockResolvedValueOnce(undefined);

    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);

    const res = await getFimsData(
      "code",
      "state",
      "iss",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Cannot retrieve user data | Nonce not found",
        title: "Unauthorized",
      });
  });

  it("should return error if fims client fails", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);
    userinfoMock.mockRejectedValueOnce("Error");

    const res = await getFimsData(
      "code",
      "state",
      "iss",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Cannot retrieve user data | Error",
        title: "Unauthorized",
      });
  });
});

describe("createSessionAndRedirect", () => {
  it("should create session and return a redirect if redis succeed", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);

    const res = await createSessionAndRedirect(
      {
        family_name: "Surname",
        fiscal_code: "AAABBB00C00D000E",
        given_name: "Name",
      } as OidcUser,
      "aState",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toContain("https://baseurl.it/authorize?id=");
  });

  it("should create session and return a redirect if redis succeed and find a device", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);

    redisGetMock.mockResolvedValueOnce("aDevice");

    const res = await createSessionAndRedirect(
      {
        family_name: "Surname",
        fiscal_code: "AAABBB00C00D000E",
        given_name: "Name",
      } as OidcUser,
      "aState",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toContain("&device=aDevice");
  });

  it("should return an error if redis fail", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);

    redisSetExMock.mockRejectedValue("Error");

    const res = await createSessionAndRedirect(
      {
        family_name: "Surname",
        fiscal_code: "AAABBB00C00D000E",
        given_name: "Name",
      } as OidcUser,
      "aState",
    )({
      config,
      fimsClient: fimsClientMock,
      redisClientFactory: redisClientFactoryMock,
    })();

    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 401,
        message: "Cannot create session",
        title: "Unauthorized",
      });
  });
});
