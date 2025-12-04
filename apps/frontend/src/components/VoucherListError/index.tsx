import { EmptyState } from '@io-cdc/ui';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';

type VoucherListErrorProps = {
  reload: () => void;
};

export const VoucherListError = ({ reload }: VoucherListErrorProps) => {
  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_LIST_ERROR', { event_category: 'KO', event_type: 'error' });
  }, []);
  return (
    <Stack minHeight={100} justifyContent="center">
      <EmptyState icon="info" title="Non siamo riusciti a caricare la lista dei buoni" />
      <Button variant="text" onClick={reload}>
        Prova di nuovo
      </Button>
    </Stack>
  );
};
