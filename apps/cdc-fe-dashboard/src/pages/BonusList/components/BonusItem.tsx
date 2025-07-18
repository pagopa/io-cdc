import { Stack, Typography } from '@mui/material';
import { BonusItem } from '../../../store/services/model';
import { Icon } from '@io-cdc/ui';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

type BonusCardProps = {
  bonus: BonusItem;
  spent: boolean;
};

export const BonusCard = ({ bonus, spent }: BonusCardProps) => {
  const navigate = useNavigate();
  const itemLabel = `Buono ${bonus.fromOthers ? (spent ? 'speso da altri' : 'generato da altri') : bonus.id}`;
  const mainColor = bonus.fromOthers ? '#5C6F82' : '#17324D';

  const goToDetail = useCallback(() => {
    if (bonus.fromOthers) return;
    navigate(`/dettaglio-buono/${bonus.id}`);
  }, [bonus.fromOthers, bonus.id, navigate]);

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
              {bonus.date}
            </Typography>
          </Stack>
        </Stack>
        <Typography color={mainColor} fontWeight={600}>
          {bonus.amount} €
        </Typography>
      </Stack>
    </Stack>
  );
};
