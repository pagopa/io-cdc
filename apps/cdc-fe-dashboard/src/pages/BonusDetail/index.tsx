import { Button, Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { QrCode } from '../../components/QrCode';
import { BarCode } from '../../components/BarCode';

const BonusDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Stack p={4} gap={3}>
      <Header />
      <Stack gap={8}>
        <Stack gap={2}>
          <Typography variant="h2">Il tuo buono</Typography>
          <Typography color="#5C6F82">
            Se acquisti online, inserisci il codice nel campo dedicato. Per acquisti in negozio,
            mostralo all&apos;esercente. Il buono è personale e può essere utilizzato solo da te.
          </Typography>
          <Typography color="#5C6F82">
            Il buono è personale e può essere utilizzato solo da te.
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={3}>
        <Typography color="#5C6F82">Bar code</Typography>
        <Stack gap={3} alignItems="center">
          <BarCode />
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={3}>
        <Typography color="#5C6F82">QR Code</Typography>
        <Stack gap={3} alignItems="center">
          <QrCode />
        </Stack>
      </Stack>
      <Button variant="contained" onClick={() => navigate(-1)}>
        Chiudi
      </Button>
    </Stack>
  );
};

export default BonusDetail;
