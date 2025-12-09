export type YearsList = string[];

//TODO Test only
export enum TEST_USERS {
  REGISTRATION = 'REGISTRATION',
  USAGE = 'USAGE',
}

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

export type Year = {
  label: string;
  value: string;
  disabled: boolean;
};

export type Card = {
  card_name: string;
  year: string;
  expiration_date: string;
  residual_amount: number;
};

export type VoucherItem = {
  id: string;
  amount: number;
  creation_date: string;
  expiration_date: string;
  voucher_status: VOUCHER_STATUS;
  card_year: string;
  applicant: APPLICANTS;
  spending_date?: string;
  merchant?: string;
  refund?: {
    amount: number;
    refund_status: REFUND_STATUS;
  };
};
