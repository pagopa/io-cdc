import { VoucherItem } from '../../../features/app/model';

export const getVoucherConfig = (voucher: VoucherItem) => {
  switch (voucher.applicant) {
    case 'FAMILY_MEMBER':
      return {
        itemLabel: `Buono ${voucher.status === 'USED' ? 'speso da altri' : 'generato da altri'}`,
        mainColor: '#5C6F82',
      };
    case 'SELF':
    default:
      return {
        itemLabel: 'Il tuo buono',
        mainColor: '#17324D',
      };
  }
};
