import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

import { CdcEnvironment, CdcUtils } from "../utils/cdc.js";
import { CdcClientEnvironmentRouter } from "../utils/env_router.js";

export const getAlreadyRequestedYearsCdcTEMock = vi
  .fn()
  .mockReturnValue(TE.of([]));

export const CdcUtilsMock = {
  env: CdcEnvironment.TEST,
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTEMock,
} as CdcUtils;

export const CdcClientEnvironmentRouterMock = {
  getClient: () => CdcUtilsMock,
} as unknown as CdcClientEnvironmentRouter;
