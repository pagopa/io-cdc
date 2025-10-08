import { VoucherItem, Card } from './model';

export type RequestBonusDto = string[];

export type GetBonusByIdResponseDTO = VoucherItem;

export type GetCardsResponseDTO = Card[];

export type GetVouchersResponseDTO = VoucherItem[];

export type DeleteVoucherResponseDTO = {
  deleted: boolean;
  bonusId: string;
};

export type CreateVoucherRequestDTO = {
  card_year: string;
  amount: number;
};

export type CreateVoucherResponseDTO = {
  id: string;
};

export type SessionResponseDTO = {
  token: string;
};

export type GetYearsListResponseDTO = string[];

export type GetNotAvailableYearsListResponseDTO = Array<{ year: string }>;

export type GetSessionParamsRequestDTO = {
  id: string;
};
