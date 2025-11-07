import { ChipProps } from '@mui/material';
import { REFUND_STATUS, VoucherItem } from '../../features/app/model';

export const getChipConfig: (
  refund?: VoucherItem['refund'],
  spent?: boolean,
) => { label: string; color: ChipProps['color'] } = (refund, spent) => {
  if (refund?.refund_status === REFUND_STATUS.COMPLETED)
    return { label: 'COMPLETATO', color: 'success' };
  if (refund?.refund_status === REFUND_STATUS.PENDING)
    return { label: 'IN CORSO', color: 'warning' };
  if (refund?.refund_status === REFUND_STATUS.FAILED) return { label: 'NEGATO', color: 'error' };
  if (spent) return { label: 'SPESO', color: 'default' };
  return { label: 'DA SPENDERE', color: 'primary' };
};
