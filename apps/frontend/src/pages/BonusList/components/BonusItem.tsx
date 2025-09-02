import { Chip, ChipProps, Stack, Typography } from '@mui/material';

import { Icon } from '@io-cdc/ui';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { BonusItem } from '../../../features/app/model';
import { trackWebviewEvent } from '../../../utils/trackEvent';

type BonusCardProps =
  | {
      bonus: BonusItem;
      spent: true;
      openSheet?: null;
    }
  | {
      bonus: BonusItem;
      spent: false;
      openSheet?: () => void;
    };

export const BonusCard = ({ bonus, spent, openSheet }: BonusCardProps) => {
  const navigate = useNavigate();
  const refund = !!bonus?.refund;
  const refundCompleted = bonus?.refundCompleted;

  const itemLabel = `Buono ${
    bonus.fromOthers ? (spent ? 'speso da altri' : 'generato da altri') : bonus.id
  }`;
  const mainColor = bonus.fromOthers ? '#5C6F82' : '#17324D';

  const goToDetail = useCallback(() => {
    if (bonus.fromOthers) {
      openSheet?.();
      return;
    }
    trackWebviewEvent('CDC_BONUS_SHOW_DETAIL');
    navigate(`/dettaglio-buono/${bonus.id}`);
  }, [bonus.fromOthers, bonus.id, navigate, openSheet]);
  return (
    <Stack onClick={goToDetail}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon name={bonus.fromOthers ? 'people' : 'ticket'} />
          <Stack>
            <Typography color={mainColor} fontWeight={600}>
              {itemLabel}
            </Typography>
            <Typography fontSize={16} color="#5C6F82">
              {`${bonus.date}${spent ? ` \u00B7 ${(bonus.amount * -1).toFixed(2)} €` : ''}`}
            </Typography>
          </Stack>
        </Stack>
        {!spent && (
          <Typography color={mainColor} fontWeight={600}>
            {bonus.amount.toFixed(2)} €
          </Typography>
        )}
        {refund && !refundCompleted && (
          <Chip label="IN CORSO" color="warning" size="small" sx={{ fontSize: 14 }} />
        )}
      </Stack>
    </Stack>
  );
};
