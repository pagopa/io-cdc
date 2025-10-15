/* eslint-disable no-console */
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
    vi.setSystemTime(new Date("2025-10-31T23:59:59+01:00"));
    console.log(new Date().toISOString());

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T23:00:00Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual(years);
    }
  });

  it("should return an array of years when called before end date UTC", async () => {
    vi.setSystemTime(new Date("2025-10-31T22:59:59Z"));
    console.log(new Date().toISOString());

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T23:00:00Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual(years);
    }
  });

  it("should return an empty array when called after end date CEST", async () => {
    vi.setSystemTime(new Date("2025-10-31T23:00:00Z"));
    console.log(new Date().toISOString());

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T23:00:00Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual([]);
    }
  });

  it("should return an empty array when called after end date UTC", async () => {
    vi.setSystemTime(new Date("2025-10-31T23:00:00Z"));
    console.log(new Date().toISOString());

    const res = await getYears()({
      config: {
        CDC_REGISTRATION_END_DATE: "2025-10-31T23:00:00Z" as NonEmptyString,
      } as Config,
    })();

    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) {
      expect(res.right).toEqual([]);
    }
  });
});
