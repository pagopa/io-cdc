import { Icon } from '@io-cdc/ui';
import { Button, Stack, Typography } from '@mui/material';
import { DEFAULT_CONFIG, EXPIRED_INITIATIVE_CONFIG_MAP } from './constants';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';

const ExpiredInitiative = () => {
  const {
    state: { status },
  } = useLocation();

  const { image, description, title, trackProperties } =
    EXPIRED_INITIATIVE_CONFIG_MAP?.[status] ?? DEFAULT_CONFIG;

  useEffect(() => {
    if (trackProperties) {
      trackWebviewEvent('CDC_REQUEST_EXPIRED', trackProperties);
    }
  }, []);

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4} padding={2}>
      <Icon name={image} sx={{ width: 60, height: 60 }} />
      <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        {description && <Typography textAlign="center">{description}</Typography>}
      </Stack>
      <Button
        onClick={() => window.location.replace('iossoapi://cancel')}
        size="small"
        variant="contained"
      >
        Chiudi
      </Button>
    </Stack>
  );
};

export default ExpiredInitiative;
