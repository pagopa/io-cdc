import { describe, expect, it } from "vitest";

import {
  aValidFiscalCode,
  anotherValidFiscalCode,
} from "../../__mocks__/types.mock.js";
import { Config } from "../../config.js";
import { CdcEnvironment } from "../cdc.js";
import { CdcClientEnvironmentRouter, isTestUser } from "../env_router.js";

const config = {
  TEST_USERS:
    // aValidFiscalCode hashed and another random hash
    "621c837e458f09d76ad9f70cfc86d9253593bdc2b8d5de0ff5c88e5831799e2f,dg7ac30b957d0604691956358a9a5c00fda27831b05cfe8a426f3b0ad3b90fc4",
} as unknown as Config;

describe("isTestUser", () => {
  it("should return true if the user is a test user", () => {
    const testUser = isTestUser(config, aValidFiscalCode);
    expect(testUser).toBe(true);
  });

  it("should return false if the user is not a test user", () => {
    const testUser = isTestUser(config, anotherValidFiscalCode);
    expect(testUser).toBe(false);
  });
});

describe("CdcClientEnvironmentRouter", () => {
  it("should return a test env client if the user is a test user", () => {
    const cdcClient = new CdcClientEnvironmentRouter(config).getClient(
      aValidFiscalCode,
    );
    expect(cdcClient.env).toBe(CdcEnvironment.TEST);
  });

  it("should return a prod env client if the user is not a test user", () => {
    const cdcClient = new CdcClientEnvironmentRouter(config).getClient(
      anotherValidFiscalCode,
    );
    expect(cdcClient.env).toBe(CdcEnvironment.PRODUCTION);
  });
});
