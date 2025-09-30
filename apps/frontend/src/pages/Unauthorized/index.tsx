import { Icon } from '@io-cdc/ui';
import { Button, Stack, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4}>
      <Icon name="error" sx={{ width: 60, height: 60 }} />
      <Stack gap={4} justifyContent="center" alignItems="center">
        <Typography variant="h4" textAlign="center">
          Non sei autorizzato
        </Typography>
        <Typography textAlign="center">
          La tua sessione potrebbe essere invalida o scaduta
        </Typography>
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

export default Unauthorized;
