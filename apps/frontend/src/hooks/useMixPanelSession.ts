import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics } from '@io-cdc/mixpanel';

export const useMixPanelSession = () => {
  const { search } = useLocation();

  const deviceId = useMemo(() => new URLSearchParams(search).get('device'), [search]);

  const config = {
    ANALYTICS_ENABLE: import.meta.env.VITE_ANALYTICS_ENABLE,
    ANALYTICS_TOKEN: import.meta.env.VITE_ANALYTICS_TOKEN || '',
    ANALYTICS_API_HOST: import.meta.env.VITE_ANALYTICS_API_HOST,
    ANALYTICS_PERSISTENCE: import.meta.env.VITE_ANALYTICS_PERSISTENCE,
    ANALYTICS_LOG_IP: import.meta.env.VITE_ANALYTICS_LOG_IP,
    ANALYTICS_DEBUG: import.meta.env.VITE_ANALYTICS_DEBUG,
  };

  useEffect(() => {
    console.info('useMixpanelSession effect', { deviceId, config });
    if (!!deviceId) {
      initAnalytics(deviceId, config);
    }
  }, []);
};
