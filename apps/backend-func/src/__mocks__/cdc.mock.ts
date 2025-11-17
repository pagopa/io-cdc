import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

import { CdcClientEnvironmentRouter } from "../utils/env_router.js";

export const getAlreadyRequestedYearsCdcTEMock = vi
  .fn()
  .mockReturnValue(TE.of([]));

export const requestCdcTEMock = vi.fn().mockReturnValue(TE.of(true));

export const getCdcCardsTEMock = vi.fn().mockReturnValue(
  TE.of([
    {
      card_name: `Carta della Cultura 2020`,
      expiration_date: "2026-12-31T22:59:59.999Z",
      residual_amount: 100,
      year: 2020,
    },
  ]),
);

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

export const CdcClientEnvironmentRouterMock = {
  getClient: () => CdcUtilsMock,
} as unknown as CdcClientEnvironmentRouter;
