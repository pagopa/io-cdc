import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics } from '@io-cdc/mixpanel';

export const useMixPanelSession = () => {
  const { search } = useLocation();

  const deviceId = useMemo(() => new URLSearchParams(search).get('device'), [search]);

  useEffect(() => {
    if (deviceId) {
      initAnalytics(deviceId);
    }
  }, [deviceId]);
};
