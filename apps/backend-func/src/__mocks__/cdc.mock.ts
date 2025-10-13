import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

export const getAlreadyRequestedYearsCdcTEMock = vi
  .fn()
  .mockReturnValue(TE.of([]));

export const requestCdcTEMock = vi.fn().mockReturnValue(TE.of(true));

export const getCdcCardsTEMock = vi.fn().mockReturnValue(TE.of([]));

export const getCdcVouchersTEMock = vi.fn().mockReturnValue(TE.of([]));

export const postCdcVouchersMock = vi.fn().mockReturnValue(TE.of({}));

export const getCdcVoucherTEMock = vi.fn().mockReturnValue(TE.of({}));

export const deleteCdcVoucherTEMock = vi.fn().mockReturnValue(TE.of(true));

export const CdcUtilsMock = {
  deleteCdcVoucherTE: deleteCdcVoucherTEMock,
  getAlreadyRequestedYearsCdcTE: getAlreadyRequestedYearsCdcTEMock,
  getCdcCardsTE: getCdcCardsTEMock,
  getCdcVoucherTE: getCdcVoucherTEMock,
  getCdcVouchersTE: getCdcVouchersTEMock,
  postCdcVouchersTE: postCdcVouchersMock,
  requestCdcTE: requestCdcTEMock,
};
