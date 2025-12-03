import { Icon, OperationResult } from '@io-cdc/ui';
import { Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';

const FeedbackCards = () => {
  useEffect(() => {
    trackWebviewEvent('CDC_CARD_DETAIL_ERROR', { event_category: 'KO' });
  }, []);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <Icon name="umbrella" sx={{ width: 60, height: 60 }} />
      <OperationResult
        title="Il dettaglio dell'iniziativa non è al momento disponibile"
        description="Riprova tra un po'"
      />
      <Box>
        <Button
          onClick={() => window.location.replace(import.meta.env.VITE_CLOSE_DEEPLINK)}
          variant="contained"
        >
          Chiudi
        </Button>
      </Box>
    </Stack>
  );
};

export default FeedbackCards;
