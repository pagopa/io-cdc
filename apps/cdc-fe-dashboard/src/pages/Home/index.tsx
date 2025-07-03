import { Button, Divider, Stack, Typography } from '@mui/material';
import { useGetCardsQuery } from '../../features/app/services';
import { Carousel } from '../../components/Carousel';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isError, isSuccess, error, data } = useGetCardsQuery();
  console.log('🚀 ~ Home ~ data:', data);
  const navigate = useNavigate();

  if (!data) return <div>no data</div>;

  return (
    <Stack flex={1} justifyContent="center" alignItems="center" paddingInline={2}>
      <Carousel list={data} />
      <Divider sx={{ height: 16 }} />
      <Typography sx={{ fontSize: 12 }}>Saldo aggiornato al 12 dicembre 2025, 12:34</Typography>
      <Stack justifyContent="center" alignItems="center" py={4} gap={2}>
        <Typography fontWeight={600}>Genera un buono</Typography>
        <Typography textAlign="center">
          Qui troverai i buoni che genererai per i tuoi acquisti.
        </Typography>
      </Stack>
      <Stack width="100%">
        <Button variant="contained" onClick={() => navigate('/genera-buono')}>
          Genera buono
        </Button>
        <Button variant="text">Mostra esercenti</Button>
      </Stack>
    </Stack>
  );
};

export default Home;
