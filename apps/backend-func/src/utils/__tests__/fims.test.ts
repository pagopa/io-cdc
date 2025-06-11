import * as E from "fp-ts/lib/Either.js";
import { BaseClient, Issuer } from "openid-client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { anOidcConfig } from "../../__mocks__/types.mock.js";

// MOCK openid-client
const authorizationUrlMock = vi.fn().mockReturnValue("http://fims.it/auth");
const callbackMock = vi.fn().mockResolvedValue({ access_token: "accesstoken" });
const userinfoMock = vi.fn().mockResolvedValue({
  family_name: "Surname",
  fiscal_code: "AAABBB00C00D000E",
  given_name: "Name",
});

const discoverMock = vi.fn().mockResolvedValue({
  Client: vi.fn(
    () =>
      ({
        authorizationUrl: authorizationUrlMock,
        callback: callbackMock,
        userinfo: userinfoMock,
      }) as unknown as BaseClient,
  ),
} as unknown as Issuer<BaseClient>);

const stateMock = vi.fn().mockReturnValue("state");
const nonceMock = vi.fn().mockReturnValue("nonce");

vi.mock("openid-client", () => ({
  Issuer: {
    discover: discoverMock,
  },
  generators: {
    nonce: nonceMock,
    state: stateMock,
  },
}));

// dynamically import test class
const { OidcClient, getFimsRedirectTE, getFimsUserTE } = await import(
  "../fims.js"
);

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

  it("Should return authorization url", async () => {
    const oidcClient = new OidcClient(anOidcConfig);
    const redirectUrl = await getFimsRedirectTE(oidcClient)();
    expect(E.isRight(redirectUrl)).toBe(true);
  });

  it("Should return userinfo", async () => {
    const oidcClient = new OidcClient(anOidcConfig);
    const userInfo = await getFimsUserTE(
      oidcClient,
      "cburl",
      "anauthcode",
      "state",
    )();
    expect(E.isRight(userInfo)).toBe(true);
  });
});
