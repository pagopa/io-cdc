import { trackEventBuilder } from '@io-cdc/mixpanel';

export const trackEvent = trackEventBuilder(import.meta.env.VITE_ANALYTICS_ENABLE);
