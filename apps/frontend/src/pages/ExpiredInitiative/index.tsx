import { Icon } from '@io-cdc/ui';
import { Button, Stack, Typography } from '@mui/material';
import { DEFAULT_CONFIG, EXPIRED_INITIATIVE_CONFIG_MAP } from './constants';
import { useLocation } from 'react-router-dom';

//TODO -> define what should be done on close
const ExpiredInitiative = () => {
  const {
    state: { status },
  } = useLocation();

  const { image, description, title } = EXPIRED_INITIATIVE_CONFIG_MAP?.[status] ?? DEFAULT_CONFIG;
  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4}>
      <Icon name={image} sx={{ width: 60, height: 60 }} />
      <Stack gap={4} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        {description && <Typography textAlign="center">{description}</Typography>}
      </Stack>
      <Button onClick={() => window.location.reload()} size="small" variant="contained">
        Chiudi
      </Button>
    </Stack>
  );
};

export default ExpiredInitiative;
