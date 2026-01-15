import { Icon, OperationResult } from '@io-cdc/ui';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { APP_ROUTES } from '../../routes/appRoutes';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';

const OutOfCreditsFeedback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_CREDIT_EXHAUSTED', { event_type: 'error', event_category: 'KO' });
  }, []);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <Icon name="piggybank" sx={{ width: 60, height: 60 }} />
      <OperationResult
        title="Il credito disponibile è terminato"
        subTitle={`
          Se hai generato dei buoni che non hai ancora speso, puoi annullarli. 
          Il credito tornerà subito disponibile per generare nuovi buoni che potranno essere usati da te o dal tuo nucleo familiare.`}
      />
      <Box>
        <Button onClick={() => navigate(APP_ROUTES.HOME)} variant="contained">
          Chiudi
        </Button>
      </Box>
    </Stack>
  );
};

export default OutOfCreditsFeedback;
