import * as E from "fp-ts/Either";
import { afterEach, describe, expect, it, vi } from "vitest";

import { discoverMock, getFimsClient } from "../../__mocks__/fims.mock.js";
import { anOidcConfig } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { getFimsRedirect } from "../fauth.js";

describe("getFimsRedirect", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return a redirect url when fims client succeed", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);
    const res = await getFimsRedirect({ fimsClient: fimsClientMock })();
    expect(E.isRight(res)).toBe(true);
    if (E.isRight(res)) expect(res.right).toBe("http://fims.it/auth");
  });

  it("should return an Error when fims client fails", async () => {
    const fimsClientMock = getFimsClient({
      ...anOidcConfig,
    } as unknown as Config);
    discoverMock.mockRejectedValueOnce("Error");
    const res = await getFimsRedirect({ fimsClient: fimsClientMock })();
    expect(E.isLeft(res)).toBe(true);
    if (E.isLeft(res))
      expect(res.left).toEqual({
        code: 500,
        message: "Error",
        title: "Internal Server Error",
      });
  });
});
