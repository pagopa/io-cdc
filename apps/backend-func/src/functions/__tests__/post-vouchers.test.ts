import * as E from "fp-ts/lib/Either.js";
import * as TE from "fp-ts/lib/TaskEither.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CdcClientEnvironmentRouterMock,
  postCdcVouchersMock,
} from "../../__mocks__/cdc.mock.js";
import {
  getRedisClientFactoryMock,
  redisGetMock,
} from "../../__mocks__/redis_client_factory.mock.js";
import { aValidSession } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { getSession, postVouchers } from "../post-vouchers.js";

const redisClientFactoryMock = getRedisClientFactoryMock();
const config = {
  TEST_USERS: "",
} as unknown as Config;
const deps = {
  cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
  config,
  redisClientFactory: redisClientFactoryMock,
};

describe("post-vouchers | getSession", () => {
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

describe("post-vouchers | postVouchers", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return error when cdc fails", async () => {
    postCdcVouchersMock.mockReturnValueOnce(TE.left(new Error("cdc error")));
    const res = await postVouchers(aValidSession, { amount: 5, year: "2020" })(
      deps,
    )();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "cdc error",
        title: "Internal Server Error",
      });
  });

  it("1. should succeed when everything is ok", async () => {
    const res = await postVouchers(aValidSession, { amount: 5, year: "2020" })(
      deps,
    )();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual({
        amount: 5,
        applicant: "SELF",
        card_year: "2020",
        expiration_date: "2026-12-30T23:00:00.000Z",
        id: "code1",
        voucher_status: "PENDING",
      });
  });
});
