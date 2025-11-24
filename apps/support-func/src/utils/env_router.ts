import { FiscalCode } from "@pagopa/ts-commons/lib/strings.js";

import { Config } from "../config.js";
import { CdcEnvironment, CdcUtils } from "./cdc.js";
import { toHash } from "./hash.js";

export const isTestUser = (config: Config, fiscalCode: FiscalCode): boolean =>
  config.TEST_USERS.includes(toHash(fiscalCode));

export class CdcClientEnvironmentRouter {
  private config: Config;
  private prodClient: CdcUtils;
  private testClient: CdcUtils;

  constructor(config: Config) {
    this.config = config;
    this.prodClient = CdcUtils(config, CdcEnvironment.PRODUCTION);
    this.testClient = CdcUtils(config, CdcEnvironment.TEST);
  }

  public getClient(fiscalCode: FiscalCode): CdcUtils {
    return isTestUser(this.config, fiscalCode)
      ? this.testClient
      : this.prodClient;
  }
}
