import { trackEventBuilder } from '@io-cdc/mixpanel';
import { EventProperties } from '@io-cdc/mixpanel/dist/mixpanel';

export const trackEvent = trackEventBuilder(import.meta.env.VITE_ANALYTICS_ENABLE);

export const trackWebviewEvent = (event_name: string, properties?: EventProperties) => {
  trackEvent(event_name, { webview: true, event_category: 'UX', ...properties });
};
