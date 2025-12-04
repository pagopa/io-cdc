import { Icon, OperationResult } from '@io-cdc/ui';
import { Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { useLocation } from 'react-router-dom';
import { CARDS_FEEDBACK_CONFIG } from './constants';

const FeedbackCards = () => {
  const {
    state: { status },
  } = useLocation();

  const { icon, subTitle, title, trackProperties } = CARDS_FEEDBACK_CONFIG[status];

  useEffect(() => {
    trackWebviewEvent(trackProperties.name, trackProperties.properties);
  }, [trackProperties]);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <Icon name={icon} sx={{ width: 60, height: 60 }} />
      <OperationResult title={title} description={subTitle} />
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
