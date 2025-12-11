import { Icon, OperationResult } from '@io-cdc/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { CONFIG_BY_STATUS, CONFIG_KEYS, generateGenericError } from './constants';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { APP_ROUTES } from '../../routes/appRoutes';

const TicketFeedback = () => {
  const {
    state: { status, name },
  } = useLocation();

  const navigate = useNavigate();

  const config = CONFIG_BY_STATUS[name as CONFIG_KEYS][status] ?? generateGenericError(name);

  const { title, description, icon, subTitle, trackProperties } = config;

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
