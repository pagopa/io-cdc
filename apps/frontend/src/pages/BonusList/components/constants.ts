import { VoucherItem } from '../../../features/app/model';

export const getVoucherConfig = (voucher: VoucherItem) => {
  switch (voucher.applicant) {
    case 'FAMILY_MEMBER':
      return {
        itemLabel: 'Buono generato da altri',
        mainColor: '#17324D',
      };
    case 'SELF':
    default:
      return {
        itemLabel: voucher.voucher_status !== 'PENDING' ? voucher.merchant : 'Il tuo buono',
        mainColor: '#17324D',
      };
  }
};
