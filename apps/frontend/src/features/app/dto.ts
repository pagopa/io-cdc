import { VoucherItem, Card, TEST_USERS, VOUCHER_TYPOLOGY } from './model';

export type RequestBonusDto = string[];

export type GetBonusByIdResponseDTO = VoucherItem;

export type GetCardsResponseDTO = Card[];

export type GetTypologiesResponseDTO = { typology: VOUCHER_TYPOLOGY }[];

export type GetVouchersRequestQuery = string;

export type GetVouchersResponseDTO = VoucherItem[];

export type DeleteVoucherResponseDTO = {
  deleted: boolean;
  bonusId: string;
};

export type CreateVoucherRequestDTO = {
  year: string;
  amount: number;
  typology: VOUCHER_TYPOLOGY;
};

export type CreateVoucherResponseDTO = {
  id: string;
};

export type SessionResponseDTO = {
  token: string;
  route: TEST_USERS;
};

export type GetYearsListResponseDTO = string[];

export type GetNotAvailableYearsListResponseDTO = Array<{ year: string }>;

export type GetSessionParamsRequestDTO = {
  id: string;
};
