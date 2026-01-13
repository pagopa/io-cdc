import { Icon, OperationResult } from '@io-cdc/ui';
import { Button, Stack } from '@mui/material';

const Unauthorized = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%" gap={4}>
      <Icon name="timeout" sx={{ width: 60, height: 60 }} />
      <OperationResult
        title="La tua sessione è scaduta"
        subTitle="Per continuare, apri di nuovo Carta della Cultura dal Portafoglio"
      />
      <Button
        onClick={() => window.location.replace(import.meta.env.VITE_CLOSE_DEEPLINK)}
        size="small"
        variant="contained"
      >
        Chiudi
      </Button>
    </Stack>
  );
};

export default Unauthorized;
