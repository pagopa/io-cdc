import * as E from "fp-ts/lib/Either.js";
import { pipe } from "fp-ts/lib/function.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import { aValidSession } from "../../__mocks__/types.mock.js";
import { Session } from "../session.js";

describe("Codec", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should decode a valid session record", async () => {
    const decoded = pipe(aValidSession, Session.decode);
    expect(E.isRight(decoded)).toBe(true);
  });

  it("Should decode a valid session record with device_id", async () => {
    const decoded = pipe(
      { ...aValidSession, device_id: "anydeviceid" },
      Session.decode,
    );
    expect(E.isRight(decoded)).toBe(true);
  });
});
