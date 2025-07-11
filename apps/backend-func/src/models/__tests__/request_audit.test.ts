import * as E from "fp-ts/lib/Either.js";
import { pipe } from "fp-ts/lib/function.js";
import * as t from "io-ts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { aRequestAudit } from "../../__mocks__/types.mock.js";
import { RequestAudit } from "../request_audit.js";

describe("RequestAudit|Codec", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Should decode a single record", async () => {
    const decoded = pipe(aRequestAudit, RequestAudit.decode);
    expect(E.isRight(decoded)).toBe(true);
  });

  it("Should decode an empty list of records", async () => {
    const decoded = pipe([], t.array(RequestAudit).decode);
    expect(E.isRight(decoded)).toBe(true);
  });

  it("Should decode an valued list of records", async () => {
    const decoded = pipe([aRequestAudit], t.array(RequestAudit).decode);
    expect(E.isRight(decoded)).toBe(true);
  });
});
