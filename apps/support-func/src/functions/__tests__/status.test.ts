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

import {
  CdcClientEnvironmentRouterMock,
  getAlreadyRequestedYearsCdcTEMock,
} from "../../__mocks__/cdc.mock.js";
import { aValidFiscalCode } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { getCitizenStatus } from "../status.js";

const config = {
  CDC_CARDS_EXPIRATION_DATE: "2026-12-31T23:00:00Z",
  CDC_USAGE_END_DATE: "2026-12-31T22:59:59.999Z",
  CDC_USAGE_START_DATE: "2025-12-16T11:00:00.000Z",
  COSMOSDB_CDC_DATABASE_NAME: "database",
  TEST_USERS: "",
} as unknown as Config;

describe("status | getCitizenStatus", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("1. should return 404 when period is not started", async () => {
    vi.setSystemTime(new Date("2025-12-16T11:59:59.999+01:00"));
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual(expect.objectContaining({ code: 404 }));
  });

  it("1. should return 404 when period is over", async () => {
    vi.setSystemTime(new Date("2026-12-31T23:00:00.001Z"));
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual(expect.objectContaining({ code: 404 }));
  });

  it("1. should return 404 if cosmos succeeds with no items", async () => {
    vi.setSystemTime(new Date("2026-12-31T22:00:00.001Z"));
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual(expect.objectContaining({ code: 404 }));
  });

  it("1. should return a CitizenStatus if cdcUtils succeeds with items", async () => {
    vi.setSystemTime(new Date("2026-12-31T22:00:00.001Z"));
    getAlreadyRequestedYearsCdcTEMock.mockReturnValueOnce(
      TE.of(["2020", "2021", "2022"]),
    );
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
    })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res))
      expect(res.right).toEqual({
        expiration_date: new Date("2026-12-31T23:00:00Z"),
        number_of_cards: 3,
      });
  });

  it("1. should return InternalServerError if cdcUtils fails during fetch", async () => {
    vi.setSystemTime(new Date("2026-12-31T22:00:00.001Z"));
    getAlreadyRequestedYearsCdcTEMock.mockReturnValueOnce(
      TE.left(new Error("Error")),
    );
    const res = await getCitizenStatus(aValidFiscalCode)({
      cdcClientEnvironmentRouter: CdcClientEnvironmentRouterMock,
      config,
    })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
  });
});
