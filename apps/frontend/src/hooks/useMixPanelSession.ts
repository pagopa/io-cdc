import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics } from '@io-cdc/mixpanel';

export const useMixPanelSession = () => {
  const { search } = useLocation();

  const deviceId = useMemo(() => search.split('deviceId=')[1], [search]);

  useEffect(() => {
    initAnalytics(deviceId);
  }, [deviceId]);
};
