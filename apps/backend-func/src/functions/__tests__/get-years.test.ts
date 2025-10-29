import { NonEmptyString } from "@pagopa/ts-commons/lib/strings.js";
import * as E from "fp-ts/lib/Either.js";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { Config } from "../../config.js";
import { years } from "../../models/card_request.js";
import { getYears } from "../get-years.js";

describe("GetYears", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("should return an array of years when called before end date CEST", async () => {
    vi.setSystemTime(new Date("2025-10-31T11:59:59.998+01:00"));

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T10:59:59.999Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual(years);
    }
  });

  it("should return an array of years when called before end date UTC", async () => {
    vi.setSystemTime(new Date("2025-10-31T10:59:59.998Z"));

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T10:59:59.999Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual(years);
    }
  });

  it("should return an empty array when called after end date CEST", async () => {
    vi.setSystemTime(new Date("2025-10-31T12:00:00.000+01:00"));

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T10:59:59.999Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual([]);
    }
  });

  it("should return an empty array when called after end date UTC", async () => {
    vi.setSystemTime(new Date("2025-10-31T11:00:00.000Z"));

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T10:59:59.999Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual([]);
    }
  });
});
