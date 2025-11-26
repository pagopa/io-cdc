import { Chip, Stack, Typography } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { VoucherItem } from '../../../features/app/model';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { getVoucherConfig } from './constants';
import { formatDecimals } from '../../../utils/formatDecimals';
import { ChipLabel } from '../../BonusDetail/components/ChipLabel';

type VoucherCardProps =
  | {
      voucher: VoucherItem;
      spent: true;
      openSheet?: () => void;
    }
  | {
      voucher: VoucherItem;
      spent: false;
      openSheet?: () => void;
    };

const formatDate = (d: string | Date) => {
  const date = typeof d !== 'string' ? d : new Date(d);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const VoucherCard = ({ voucher, spent, openSheet }: VoucherCardProps) => {
  const navigate = useNavigate();

  const others = voucher.applicant === 'FAMILY_MEMBER';

  const { itemLabel, mainColor } = getVoucherConfig(voucher);

  const date = useMemo(() => {
    if (voucher.voucher_status === 'PENDING') return formatDate(voucher.expiration_date);
    return formatDate(voucher.spending_date ?? voucher.expiration_date);
  }, [voucher]);

  const goToDetail = useCallback(() => {
    if (others) {
      openSheet?.();
      return;
    }
    trackWebviewEvent('CDC_BONUS_SHOW_DETAIL');
    navigate(`/dettaglio-buono/${voucher.id}`);
  }, [others, voucher.id, navigate, openSheet]);

  return (
    <Stack onClick={goToDetail}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon name={others ? 'people' : 'ticket'} />
          <Stack>
            <Typography color={mainColor} fontWeight={600}>
              {itemLabel}
            </Typography>
            <Typography fontSize={16} color="#5C6F82">
              {`${date}${spent ? ` \u00B7 ${formatDecimals(voucher.amount * -1)} €` : ''}`}
            </Typography>
          </Stack>
        </Stack>
        {!spent && (
          <Typography color={mainColor} fontWeight={600}>
            {formatDecimals(voucher.amount)} €
          </Typography>
        )}
        {voucher?.refund && voucher?.refund?.refund_status === 'PENDING' && (
          <Chip label={<ChipLabel>IN CORSO</ChipLabel>} color="warning" size="small" />
        )}
      </Stack>
    </Stack>
  );
};
