import { Icon, OperationResult } from '@io-cdc/ui';
import { useLocation } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { CONFIG_BY_STATUS } from './constants';
import { useEffect } from 'react';
import { trackEvent } from '../../utils/trackEvent';

const Feedback = () => {
  const {
    state: { status, years },
  } = useLocation();

  const { title, description, icon, subTitle, trackProperties } = CONFIG_BY_STATUS[status];

  useEffect(() => {
    if (!trackProperties) return;
    const { name, properties } = trackProperties;

    if (status === 200) {
      trackEvent(name, { ...properties, years });
      return;
    }
    trackEvent(name, properties);
  }, []);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      {icon && <Icon name={icon} sx={{ width: 60, height: 60 }} />}
      <OperationResult title={title} subTitle={subTitle} description={description} />
      <Box>
        <Button onClick={() => window.location.replace('iossoapi://cancel')} variant="contained">
          Chiudi
        </Button>
      </Box>
    </Stack>
  );
};

export default Feedback;
