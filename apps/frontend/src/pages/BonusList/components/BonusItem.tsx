import { Chip, ChipProps, Stack, Typography } from '@mui/material';

import { Icon } from '@io-cdc/ui';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { VoucherItem } from '../../../features/app/model';
import { trackWebviewEvent } from '../../../utils/trackEvent';
import { getVoucherConfig } from './constants';

type VoucherCardProps =
  | {
      voucher: VoucherItem;
      spent: true;
      openSheet?: null;
    }
  | {
      voucher: VoucherItem;
      spent: false;
      openSheet?: () => void;
    };

export const VoucherCard = ({ voucher, spent, openSheet }: VoucherCardProps) => {
  const navigate = useNavigate();

  const others = voucher.applicant === 'FAMILY_MEMBER';

  const { itemLabel, mainColor } = getVoucherConfig(voucher);

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
              {`${voucher.expiration_date}${
                spent ? ` \u00B7 ${(voucher.amount * -1).toFixed(2)} €` : ''
              }`}
            </Typography>
          </Stack>
        </Stack>
        {!spent && (
          <Typography color={mainColor} fontWeight={600}>
            {voucher.amount.toFixed(2)} €
          </Typography>
        )}
        {voucher?.refund && voucher?.refund?.status === 'PENDING' && (
          <Chip label="IN CORSO" color="warning" size="small" sx={{ fontSize: 14 }} />
        )}
      </Stack>
    </Stack>
  );
};
