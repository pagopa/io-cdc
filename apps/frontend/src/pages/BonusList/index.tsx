import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Header } from '../../components/Header';
import { BonusList as BonusListComponent } from '../../components/BonusList';
import { useGetBonusQuery } from '../../store/services/api';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../utils/appRoutes';

const TEXT_COLOR = '#5C6F82';

const BonusList = () => {
  const { data: bonusList, isLoading, error } = useGetBonusQuery();
  const navigate = useNavigate();

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

  if (isLoading) return <>Loading...</>;
  if (error) return <>Errore</>;

  return bonusList ? (
    <Stack p={4} gap={3}>
      <Header onBack={() => navigate(APP_ROUTES.HOME)} />
      <Stack gap={8}>
        <Stack gap={2}>
          <Typography variant="h2">Tutti i buoni</Typography>
          <Typography color={TEXT_COLOR}>{lastUpdateLabel}</Typography>
        </Stack>
      </Stack>
      <BonusListComponent bonusList={bonusList} />
    </Stack>
  ) : (
    <>not found</>
  );
};

export default BonusList;
