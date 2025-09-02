export type AppState = {
  years: YearsList;
};

export type YearsList = string[];

export type RequestedYearsList = Array<{ year: string }>;

export type Year = {
  label: string;
  value: string;
  disabled: boolean;
};

export type ApiError = {
  status: number;
  data: {
    message: string;
  };
};

export type SessionParams = {
  id: string;
};

export type SessionResponseDTO = {
  token: string;
};

export enum CARD_STATUS {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export enum VOUCHER_STATUS {
  PENDING = 'PENDING',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  REFUNDED = 'REFUNDED',
}

export enum APPLICANTS {
  SELF = 'SELF',
  FAMILY_MEMBER = 'FAMILY_MEMBER',
}

export enum REFUND_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type Card = {
  card_name: string;
  year: string;
  status: CARD_STATUS;
  expiration_date: string;
  residual_amount: number;
};

// manca la data di spesa - mancano i codici (codice a barre e codice QR)
export type VoucherItem = {
  id: string;
  amount: number;
  expiration_date: string;
  status: VOUCHER_STATUS;
  card_year: string;
  applicant: APPLICANTS;
  merchant: string;
  refund?: {
    amount: number;
    status: REFUND_STATUS;
  };
};
