import { BaseClient, Issuer } from "openid-client";
import { vi } from "vitest";

// MOCK openid-client
export const authorizationUrlMock = vi
  .fn()
  .mockReturnValue("http://fims.it/auth");
export const callbackMock = vi
  .fn()
  .mockResolvedValue({ access_token: "accesstoken" });
export const userinfoMock = vi.fn().mockResolvedValue({
  family_name: "Surname",
  fiscal_code: "AAABBB00C00D000E",
  given_name: "Name",
});

export const discoverMock = vi.fn().mockResolvedValue({
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
const { OidcClient, getFimsClient, getFimsRedirectTE, getFimsUserTE } =
  await import("../utils/fims.js");

export { OidcClient, getFimsClient, getFimsRedirectTE, getFimsUserTE };
