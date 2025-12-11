import { Icon, OperationResult } from '@io-cdc/ui';
import { Button, Stack } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { trackWebviewEvent } from '../../utils/trackEvent';
import { useMobileOS } from '../../hooks';

const CourtesyPage = () => {
  const os = useMobileOS();

  const deepLink = useMemo(() => {
    if (!os) return '';
    if (os === 'android') return 'https://play.google.com/store/apps/details?id=it.pagopa.io.app';
    return 'https://apps.apple.com/it/app/io/id1501681835';
  }, [os]);

  const onClickDeeplink = () => {
    trackWebviewEvent('CDC_APP_UPDATE');
    window.location.replace(deepLink);
  };

  useEffect(() => {
    trackWebviewEvent('CDC_ON_EVALUATION', { event_category: 'KO' });
  }, []);

  return (
    <Stack height="100%" justifyContent="center" alignItems="center" gap={4} padding={2}>
      <Icon name="hourglass" sx={{ width: 60, height: 60 }} />
      <OperationResult
        title="Il periodo per richiedere la Carta è terminato"
        subTitle="Se hai fatto richiesta, riceverai l’esito direttamente su IO."
        description="Nel frattempo, ti suggeriamo di aggiornare l’app all’ultima versione"
      />
      <Stack direction="column" justifyContent="center" alignItems="center" gap={2}>
        <Button onClick={onClickDeeplink} variant="contained">
          Aggiorna l&apos;app
        </Button>
        <Button
          variant="text"
          onClick={() => window.location.replace(import.meta.env.VITE_CLOSE_DEEPLINK)}
        >
          Chiudi
        </Button>
      </Stack>
    </Stack>
  );
};

export default CourtesyPage;
