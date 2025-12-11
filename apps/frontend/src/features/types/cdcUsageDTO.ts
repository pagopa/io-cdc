import { VoucherItem, Card } from './model';

export type GetBonusByIdResponseDTO = VoucherItem;

export type GetCardsResponseDTO = Card[];

export type GetVouchersRequestQuery = string;

export type GetVouchersResponseDTO = VoucherItem[];

export type DeleteVoucherResponseDTO = {
  deleted: boolean;
  bonusId: string;
};

export type CreateVoucherRequestDTO = {
  year: string;
  amount: number;
};

export type CreateVoucherResponseDTO = {
  id: string;
};
