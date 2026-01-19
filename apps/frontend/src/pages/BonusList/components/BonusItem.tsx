import { Chip, ChipProps, Stack, Typography } from '@mui/material';
import { Icon } from '@io-cdc/ui';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { REFUND_STATUS, VoucherItem } from '../../../features/types/model';
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

const formatDate = (d: string | Date | undefined) => {
  if (!d) return '';
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
    if (voucher.voucher_status === 'PENDING') return formatDate(voucher.creation_date);
    return formatDate(voucher.spending_date);
  }, [voucher]);

  const goToDetail = useCallback(() => {
    if (others) {
      openSheet?.();
      return;
    }
    trackWebviewEvent('CDC_BONUS_SHOW_DETAIL');
    navigate(`/dettaglio-buono/${voucher.id}`);
  }, [others, voucher.id, navigate, openSheet]);

  const chipConfig: {
    label: ChipProps['label'];
    color: ChipProps['color'];
  } | null = useMemo(() => {
    if (voucher?.refund?.refund_status === REFUND_STATUS.PENDING)
      return { label: <ChipLabel>IN CORSO</ChipLabel>, color: 'warning' };
    if (voucher?.refund?.refund_status === REFUND_STATUS.FAILED)
      return { label: <ChipLabel>RIFIUTATO</ChipLabel>, color: 'error' };
    return null;
  }, [voucher?.refund?.refund_status]);

  return (
    <Stack onClick={goToDetail}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0, flex: 1 }}>
          <Icon name={spent ? 'store' : others ? 'people' : 'ticket'} />
          <Stack overflow="hidden">
            <Typography
              color={mainColor}
              fontWeight={600}
              textOverflow="ellipsis"
              overflow="hidden"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {itemLabel}
            </Typography>
            <Typography fontSize={16} color="#5C6F82">
              {`${date && `${date} ${spent && '\u00B7'} `}${spent ? `\u2013 ${formatDecimals(voucher.amount)} €` : ''}`}
            </Typography>
          </Stack>
        </Stack>
        {!spent && (
          <Typography color={mainColor} fontWeight={600}>
            {formatDecimals(voucher.amount)} €
          </Typography>
        )}
        {chipConfig && <Chip {...chipConfig} size="small" />}
      </Stack>
    </Stack>
  );
};
