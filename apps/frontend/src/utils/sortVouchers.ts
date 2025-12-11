import { VoucherItem } from '../features/types/model';

export const sortByCreationDate = (vouchers: VoucherItem[] | undefined): VoucherItem[] => {
  const clone = [...(vouchers ?? [])];
  clone.sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());

  return clone;
};

export const sortBySpendingDate = (vouchers: VoucherItem[]): VoucherItem[] => {
  const clone = [...(vouchers ?? [])];
  clone.sort((a, b) =>
    a.spending_date && b.spending_date
      ? new Date(b.spending_date).getTime() - new Date(a.spending_date).getTime()
      : 1,
  );

  return clone;
};
