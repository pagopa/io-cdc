import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

export const getAlreadyRequestedYearsCdcTEMock = vi
  .fn()
  .mockReturnValue(TE.of([]));

export const requestCdcTEMock = vi.fn().mockReturnValue(TE.of(true));

export const CdcUtilsMock = {
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTEMock,
  requestCdcTE: requestCdcTEMock,
};
