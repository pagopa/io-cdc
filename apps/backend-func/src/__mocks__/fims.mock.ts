import { BaseClient, Issuer } from "openid-client";
import { vi } from "vitest";

export const fimsUserMock = {
  assertion: "assertion",
  assertion_ref: "sha256-5fd924625f6ab16a19cc9807c7c506ae1813490e4ba6",
  auth_time: "auth_time",
  family_name: "Surname",
  fiscal_code: "AAABBB00C00D000E",
  given_name: "Name",
  iss: "iss",
  public_key:
    "ewogICAgImt0eSI6ICJSU0EiLAogICAgImUiOiAiQVFBQiIsCiAgICAibiI6ICIycnJDTHR6aHZXQ2Y0bFp2Y3k4ejExOWZGb3FmWnlLcldoYUxJWEg4ZUgxOG45NGhRZDlxQlRiYmhWdEF6eUVVUDlzdHNONmNQTENxblhMYXhwaFYwVllncURvQXVuaVJtcDk1cGRVVlFadEozNXZKdzRhdG9FWW4tWGU1LURuUVRodzlONUFWTTl2T3JHVUtMSWRobnhGZ0dlclNMdkhseTU5UU4tZ1gyWUV2MUFrb3NLbWJaSGIyVTRMMTNyY1hLV3lFSmY4R28wUVY2a0t2U3ZfSXpYbmVyNG04cGhXS2VrLTVoNmxURHVvVUJ3ZXJScWg3RkI0MFFZYTlKaG1SM0pnU2V5NHMtUFhFVnY4MV9IOXQxcE1JYWxSZXBZUHVaUFZoeDQtd1FpOUVoNXlJMnhMN0ZpNjFMQUVpcEZpWkJ3R0xvNjlybHpMMExqZWVMamJDSXciCn0=",
  sid: "sid",
  sub: "sub",
};

// MOCK openid-client
export const authorizationUrlMock = vi
  .fn()
  .mockReturnValue("http://fims.it/auth");
export const callbackMock = vi
  .fn()
  .mockResolvedValue({ access_token: "accesstoken" });
export const userinfoMock = vi.fn().mockResolvedValue(fimsUserMock);

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
