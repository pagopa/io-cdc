import { Icon, OperationResult } from '@io-cdc/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { CONFIG_BY_STATUS, CONFIG_KEYS } from './constants';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../utils/appRoutes';

// TODO dev only
const defaultStatus = {
  icon: 'umbrella',
  title: 'Qualcosa non ha funzionato',
  subTitle: 'Riprova più tardi.',
  trackProperties: {
    name: 'CDC_BONUS_GENERATION_ERROR',
    properties: {
      event_category: 'KO',
      reason: 'generic_error',
    },
  },
};

const TicketFeedback = () => {
  const {
    state: { status, name },
  } = useLocation();

  const navigate = useNavigate();

  const { title, description, icon, subTitle, trackProperties } =
    CONFIG_BY_STATUS[name as CONFIG_KEYS][status] ?? defaultStatus;

  useEffect(() => {
    const { name, properties } = trackProperties;
    trackWebviewEvent(name, properties);
  }, [name, trackProperties]);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      {icon && <Icon name={icon} sx={{ width: 60, height: 60 }} />}
      <OperationResult title={title} subTitle={subTitle} description={description} />
      <Box>
        <Button onClick={() => navigate(APP_ROUTES.HOME)} variant="contained">
          Chiudi
        </Button>
      </Box>
    </Stack>
  );
};

export default TicketFeedback;
