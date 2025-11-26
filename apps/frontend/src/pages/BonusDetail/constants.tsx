import { ChipProps } from '@mui/material';
import { REFUND_STATUS, VoucherItem } from '../../features/app/model';
import { ChipLabel } from './components/ChipLabel';

export const getChipConfig: (
  refund?: VoucherItem['refund'],
  spent?: boolean,
) => { label: ChipProps['label']; color: ChipProps['color'] } = (refund, spent) => {
  if (refund?.refund_status === REFUND_STATUS.COMPLETED)
    return { label: <ChipLabel>COMPLETATO</ChipLabel>, color: 'success' };
  if (refund?.refund_status === REFUND_STATUS.PENDING)
    return { label: <ChipLabel>IN CORSO</ChipLabel>, color: 'warning' };
  if (refund?.refund_status === REFUND_STATUS.FAILED)
    return { label: <ChipLabel>NEGATO</ChipLabel>, color: 'error' };
  if (spent) return { label: <ChipLabel>SPESO</ChipLabel>, color: 'default' };
  return { label: <ChipLabel>DA SPENDERE</ChipLabel>, color: 'info' };
};
