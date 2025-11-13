import { Icon, OperationResult } from '@io-cdc/ui';
import { Box, Button, Stack } from '@mui/material';

const NotFound = () => {
  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      <Icon name="error" sx={{ width: 60, height: 60 }} />
      <OperationResult title="Page not found" />
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

export default NotFound;
