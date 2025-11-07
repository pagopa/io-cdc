// import { ChipProps } from '@mui/material';
import { VoucherItem } from '../../../features/app/model';

export const getVoucherConfig = (voucher: VoucherItem) => {
  switch (voucher.applicant) {
    case 'FAMILY_MEMBER':
      return {
        itemLabel: `Buono ${
          voucher.voucher_status === 'USED' ? 'speso da altri' : 'generato da altri'
        }`,
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

// export const getRefundChipConfig = (
//   refund?: VoucherItem['refund'],
// ): { label: string; color: ChipProps['color'] } | undefined => {
//   if (!refund) return undefined;
//   const status = refund.status;
//   if (status === 'PENDING') return { label: 'IN CORSO', color: 'warning' };
//   if (status === 'COMPLETED') return { label: 'COMPLETATO', color: 'success' };
//   if (status === 'FAILED') return { label: 'NEGATO', color: 'error' };
// };
