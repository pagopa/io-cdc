import * as E from "fp-ts/lib/Either.js";
import { afterEach, describe, expect, it, vi } from "vitest";

import { getFimsClient } from "../../__mocks__/fims.mock.js";
import { anOidcConfig } from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { OidcClient, getFimsRedirectTE, getFimsUserTE } from "../fims.js";

describe("OidcClient", () => {
  it("Should correctly create OidcClient", async () => {
    const oidcClient = new OidcClient(anOidcConfig);
    expect(oidcClient).toBeDefined();
  });
});

describe("Fims TE", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const fimsClientMock = getFimsClient({
    ...anOidcConfig,
  } as unknown as Config);

  it("Should return authorization url", async () => {
    const redirectUrl = await getFimsRedirectTE(fimsClientMock)();
    expect(E.isRight(redirectUrl)).toBe(true);
  });

  it("Should return userinfo", async () => {
    const userInfo = await getFimsUserTE(
      fimsClientMock,
      "cburl",
      "anauthcode",
      "state",
    )();
    expect(E.isRight(userInfo)).toBe(true);
  });
});
