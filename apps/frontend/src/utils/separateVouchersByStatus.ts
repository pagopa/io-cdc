import { VoucherItem } from '../features/app/model';
import { sortByCreationDate, sortBySpendingDate } from './sortVouchers';

type ReturnValue = { toSpend: VoucherItem[]; spent: VoucherItem[] };

export const separateVouchersByStatus = (vouchers: VoucherItem[]) => {
  const separate = vouchers.reduce<ReturnValue>(
    (acc, voucher) => {
      if (voucher.voucher_status === 'PENDING')
        return { ...acc, toSpend: [...acc.toSpend, voucher] };
      return { ...acc, spent: [...acc.spent, voucher] };
    },
    { toSpend: [], spent: [] },
  );

  return {
    toSpend: sortByCreationDate(separate.toSpend),
    spent: sortBySpendingDate(separate.spent),
  };
};
