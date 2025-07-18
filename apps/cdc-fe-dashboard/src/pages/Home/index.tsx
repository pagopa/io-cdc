import { Button, Divider, Stack, Typography } from '@mui/material';
import { Carousel } from '../../components/Carousel';
import { useNavigate } from 'react-router-dom';
import { useGetBonusQuery, useGetCardsQuery } from '../../store/services/api';
import { useMemo } from 'react';
import { BonusList } from '../../components/BonusList';
import { APP_ROUTES } from '../../utils/appRoutes';

const TEXT_COLOR = '#5C6F82';

const Home = () => {
  const { isError, isSuccess, error, data } = useGetCardsQuery();
  const { data: bonusList } = useGetBonusQuery();

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

  if (!data) return <div>no data</div>;

  return (
    <Stack justifyContent="center" alignItems="center" paddingInline={2}>
      <Carousel list={data} />
      <Typography sx={{ fontSize: 12 }} color={TEXT_COLOR}>
        {lastUpdateLabel}
      </Typography>
      <Stack width="100%" paddingInline={2} gap={4}>
        {bonusList && bonusList.length > 0 ? (
          <Stack width="100%" gap={2} paddingTop={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={700}>BUONI</Typography>
              <Button sx={{ padding: 0 }} onClick={() => navigate(APP_ROUTES.BONUS_LIST)}>
                Mostra tutti
              </Button>
            </Stack>
            <BonusList bonusList={bonusList} limit={3} />
          </Stack>
        ) : (
          <Stack justifyContent="center" alignItems="center" py={4} gap={2}>
            <Typography fontWeight={600}>Genera un buono</Typography>
            <Typography textAlign="center">
              Qui troverai i buoni che genererai per i tuoi acquisti.
            </Typography>
          </Stack>
        )}

        <Stack gap={2}>
          <Button variant="contained" onClick={() => navigate(APP_ROUTES.GENERATE_TICKET)}>
            Genera buono
          </Button>
          <Button variant="text">Mostra esercenti</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
