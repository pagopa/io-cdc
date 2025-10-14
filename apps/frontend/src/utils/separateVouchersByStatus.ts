import { VoucherItem } from '../features/app/model';

type ReturnValue = { toSpend: VoucherItem[]; spent: VoucherItem[] };

export const separateVouchersByStatus = (vouchers: VoucherItem[]) =>
  vouchers.reduce<ReturnValue>(
    (acc, voucher) => {
      if (voucher.status === 'PENDING') return { ...acc, toSpend: [...acc.toSpend, voucher] };
      return { ...acc, spent: [...acc.spent, voucher] };
    },
    { toSpend: [], spent: [] },
  );
