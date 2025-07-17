export type Card = {
  id: string;
  year: string;
  maxAmount: number;
  balance: number;
  expireDate: string;
};

export type BonusItem = {
  id: string;
  date: string;
  amount: number;
  fromOthers: boolean;
};
