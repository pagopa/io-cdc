import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { CdcUtilsMock, getCdcCardsTEMock } from "../../__mocks__/cdc.mock.js";
import {
  getRedisClientFactoryMock,
  redisGetMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import { aValidSession } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { getCards, getSession } from "../get-cards.js";

const redisClientFactoryMock = getRedisClientFactoryMock();
const config = {
  CDC_USAGE_END_DATE: "2026-12-31T22:59:59.999Z",
  CDC_USAGE_START_DATE: "2025-12-16T11:00:00.000Z",
  TEST_USERS: "",
} as unknown as Config;
const deps = {
  cdcUtils: CdcUtilsMock,
  config,
  redisClientFactory: redisClientFactoryMock,
};

describe("get-cards | getSession", () => {
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

describe("get-cards | getCards", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return error when period is not started", async () => {
    vi.setSystemTime(new Date("2025-12-16T11:59:59.999+01:00"));
    const res = await getCards(aValidSession)(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 400,
        message: "CDC usage period is not started yet",
        title: "Bad Request",
      });
  });

  it("1. should return error when period is over", async () => {
    vi.setSystemTime(new Date("2026-12-31T23:00:00.001Z"));
    const res = await getCards(aValidSession)(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 400,
        message: "CDC usage period is over",
        title: "Bad Request",
      });
  });

  it("1. should return error when cdc fails", async () => {
    vi.setSystemTime(new Date("2026-12-31T22:00:00.001Z"));
    getCdcCardsTEMock.mockReturnValueOnce(TE.left(new Error("cdc error")));
    const res = await getCards(aValidSession)(deps)();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "cdc error",
        title: "Internal Server Error",
      });
  });

  it("1. should succeed when everything is ok", async () => {
    vi.setSystemTime(new Date("2026-12-31T22:00:00.001Z"));
    const res = await getCards(aValidSession)(deps)();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual([
        {
          card_name: "Carta della Cultura 2020",
          expiration_date: "2026-12-31T22:59:59.999Z",
          residual_amount: 100,
          year: 2020,
        },
      ]);
  });
});
