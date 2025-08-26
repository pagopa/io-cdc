import { BonusItem, Card } from './model';

export type RequestBonusDto = string[];

export type GetBonusByIdResponseDTO = {
  id: string;
  amount: number;
  code: string;
  expireDate: string;
  spentDate?: string;
  cardYear: string;
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
