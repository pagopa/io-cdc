import { EmptyState } from '@io-cdc/ui';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/appRoutes';

type VoucherListErrorProps = {
  reload: () => void;
  showAll?: boolean;
};

export const VoucherListError = ({ reload, showAll }: VoucherListErrorProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    trackWebviewEvent('CDC_BONUS_LIST_ERROR', { event_category: 'KO', event_type: 'error' });
  }, []);

  const CtaContent = () => {
    if (!showAll)
      return (
        <Button variant="text" onClick={reload}>
          Prova di nuovo
        </Button>
      );
    return (
      <Stack>
        <Button variant="contained" onClick={reload}>
          Prova di nuovo
        </Button>
        <Button variant="text" onClick={() => navigate(APP_ROUTES.HOME)}>
          Chiudi
        </Button>
      </Stack>
    );
  };

  return (
    <Stack height="100%" justifyContent="center" gap={showAll ? 6 : 0}>
      <EmptyState icon="info" title="Non siamo riusciti a caricare la lista dei buoni" />
      <CtaContent />
    </Stack>
  );
};
