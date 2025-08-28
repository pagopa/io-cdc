import { useMemo } from 'react';
import { Divider, Stack } from '@mui/material';
import { BonusCard } from '../../pages/BonusList/components/BonusItem';
import { EmptyState, SectionTitle } from '@io-cdc/ui';
import { BonusItem } from '../../features/app/model';

type BonusListProps = {
  bonusList: BonusItem[];
};
export const BonusList = ({ bonusList }: BonusListProps) => {
  const toSpend = useMemo(() => bonusList.filter(({ amount }) => amount > 0), [bonusList]);
  const spent = useMemo(() => bonusList.filter(({ amount }) => amount < 0), [bonusList]);

  const lastUpdateLabel = useMemo(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const label = `Saldo aggiornato al ${formattedDate}, ${formattedTime}`;
    return label;
  }, []);

  return (
    <Stack gap={8}>
      <Stack>
        <SectionTitle
          title="Buoni da spendere"
          description={`Saldo aggiornato al ${lastUpdateLabel}`}
        />
        {toSpend.length ? (
          toSpend.map((bonus, index, array) => (
            <Stack gap={3} key={bonus.id} paddingTop={3}>
              <BonusCard bonus={bonus} spent={false} />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          ))
        ) : (
          <Stack minHeight={100} justifyContent="center">
            <EmptyState icon="info" title="Non sono stati trovati buoni" />
          </Stack>
        )}
      </Stack>
      <Stack>
        <SectionTitle title="Buoni spesi" />
        {spent.length ? (
          spent.map((bonus, index, array) => (
            <Stack gap={3} key={bonus.id} paddingTop={3}>
              <BonusCard bonus={bonus} spent={true} />
              {index !== array.length - 1 && <Divider />}
            </Stack>
          ))
        ) : (
          <Stack minHeight={100} justifyContent="center">
            <EmptyState icon="info" title="Non sono stati trovati buoni" />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
