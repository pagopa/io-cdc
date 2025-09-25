import * as TE from "fp-ts/lib/TaskEither.js";
import { vi } from "vitest";

import { CdcUtils } from "../utils/cdc.js";

export const getStatusTEMock = vi.fn().mockReturnValue(
  TE.of({
    expiration_date: new Date(),
    number_of_cards: 1,
  }),
);

export const CdcUtilsMock = {
  getStatusTE: getStatusTEMock,
} as CdcUtils;
