import { Icon, OperationResult } from '@io-cdc/ui';
import { Box, Button, Stack } from '@mui/material';
import { useRouteGuard } from '../../hooks';
import { CARDS_EMPTY_STATE_CONFIG } from './constants';

const CardsEmptyState = () => {
  //TODO test only
  useRouteGuard();

  const { title, icon, subTitle } = CARDS_EMPTY_STATE_CONFIG;

  //   useEffect(() => {
  //     const { name, properties } = trackProperties;
  //     trackWebviewEvent(name, properties);
  //   }, [name, trackProperties]);

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      {icon && <Icon name={icon} sx={{ width: 60, height: 60 }} />}
      <OperationResult title={title} subTitle={subTitle} />
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

export default CardsEmptyState;
