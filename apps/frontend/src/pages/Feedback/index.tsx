import { Icon, OperationResult } from '@io-cdc/ui';
import { useLocation } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import { CONFIG_BY_STATUS, FeedbackState } from './constants';

const Feedback = () => {
  const { state } = useLocation();
  const { title, description, icon, subTitle } = CONFIG_BY_STATUS[(state as FeedbackState).status];

  return (
    <Stack flex={1} justifyContent="center" alignItems="center">
      {icon && <Icon name={icon} sx={{ width: 60, height: 60 }} />}
      <OperationResult title={title} subTitle={subTitle} description={description} />
      <Box>
        <Button onClick={() => window.location.replace('/')} variant="contained">
          Chiudi
        </Button>
      </Box>
    </Stack>
  );
};

export default Feedback;
