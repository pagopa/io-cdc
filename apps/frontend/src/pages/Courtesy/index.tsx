import { Icon, OperationResult } from '@io-cdc/ui';
// import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { useRouteGuard } from '../../hooks';

const CourtesyPage = () => {
  //TODO test only
  useRouteGuard();

  // const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_ON_EVALUATION', { event_category: 'KO' });
  }, []);

  return (
    <Stack height="100%" justifyContent="center" alignItems="center" gap={4} padding={2}>
      <Icon name="hourglass" sx={{ width: 60, height: 60 }} />
      <OperationResult
        title="Attendi l'esito della tua richiesta"
        subTitle="Carta della Cultura non è ancora disponibile, riceverai l’esito direttamente su IO."
        description=" Nel frattempo, ti suggeriamo di aggiornare l’app all’ultima versione"
      />
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Button
          onClick={() => window.location.replace('https://apps.apple.com/it/app/io/id1501681835')}
          variant="contained"
        >
          Aggiorna l&apos;app
        </Button>
        <Button
          variant="text"
          onClick={() => window.location.replace(import.meta.env.VITE_HELP_CARTA_DELLA_CULTURA)}
        >
          Chiudi
        </Button>
      </Stack>
    </Stack>
  );
};

export default CourtesyPage;
