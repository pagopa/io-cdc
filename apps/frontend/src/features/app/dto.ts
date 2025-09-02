import { BonusItem, Card } from './model';

export type RequestBonusDto = string[];

export type GetBonusByIdResponseDTO = {
  id: string;
  amount: number;
  refund?: number;
  refundCompleted?: boolean;
  code: string;
  expireDate: string;
  spentDate?: string;
  cardYear: string;
  merchant: {
    name: string;
    date: string;
  };
};

export type GetCardsResponseDTO = Card[];

export type GetBonusResponseDTO = BonusItem[];

export type DeleteBonusResponseDTO = {
  deleted: boolean;
  bonusId: string;
};

export type CreateBonusRequestDTO = {
  year: string;
  amount: number;
};
