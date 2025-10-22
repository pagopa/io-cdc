import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

import { CdcUtils } from "../utils/cdc.js";

export const getAlreadyRequestedYearsCdcTEMock = vi
  .fn()
  .mockReturnValue(TE.of([]));

export const CdcUtilsMock = {
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTEMock,
} as CdcUtils;
