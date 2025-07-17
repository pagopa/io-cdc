import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Header } from '../../components/Header';
import { useGetBonusQuery } from '../../store/services/api';
import { useMemo, useState } from 'react';
import { Tabs } from './components/Tabs';
import { BonusItem } from '../../store/services/model';
import { BonusCard } from './components/BonusItem';

const TEXT_COLOR = '#5C6F82';

const BonusList = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { data: bonusList, isLoading, error } = useGetBonusQuery();

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

  const bonusByType = useMemo(() => {
    return bonusList?.reduce<{
      spent: BonusItem[];
      toSpend: BonusItem[];
    }>(
      (acc, bonus) => {
        acc[bonus.amount > 0 ? 'toSpend' : 'spent'].push(bonus);
        return acc;
      },
      {
        spent: [],
        toSpend: [],
      },
    );
  }, [bonusList]);

  if (isLoading) return <>Loading...</>;
  if (error) return <>Errore</>;

  return bonusByType ? (
    <Stack p={4} gap={3}>
      <Header />
      <Stack gap={8}>
        <Stack gap={2}>
          <Typography variant="h2">Tutti i buoni</Typography>
          <Typography color={TEXT_COLOR}>{lastUpdateLabel}</Typography>
        </Stack>
      </Stack>
      <Tabs tabIndex={tabIndex} onChangeTab={setTabIndex} />
      {bonusByType[tabIndex ? 'spent' : 'toSpend'].map((bonus, index, array) => {
        return (
          <Stack gap={3} key={bonus.id}>
            <BonusCard bonus={bonus} spent={!!tabIndex} />
            {index !== array.length - 1 && <Divider />}
          </Stack>
        );
      })}
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusList;
