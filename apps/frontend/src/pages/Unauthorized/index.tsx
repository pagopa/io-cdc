import { Icon } from '@io-cdc/ui';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4}>
      <Icon name="error" sx={{ width: 60, height: 60 }} />
      <Stack gap={4} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          Non sei autorizzato
        </Typography>
        {/* {config.description && <Typography textAlign="center">{config.description}</Typography>} */}
      </Stack>
      <Button onClick={() => navigate('iossoapi://cancel')} size="small" variant="contained">
        Chiudi
      </Button>
    </Stack>
  );
};

export default Unauthorized;
