import { IconType } from '@io-cdc/ui';

export type FeedbackState = {
  status: keyof typeof CONFIG_BY_STATUS;
};

type TrackEventProperties = {
  name: 'CDC_BONUS_GENERATION_ERROR' | 'CDC_BONUS_SHOW_DETAIL_ERROR' | '';
  properties: {
    reason: 'service_not_available' | 'generic_error';
    event_category: 'KO';
  };
};

type TrackConfig = {
  title: string;
  subTitle: string;
  icon: IconType;
  trackProperties: TrackEventProperties;
  description?: string;
};

const DEFAULT_GENERIC_ERROR: TrackConfig = {
  icon: 'umbrella',
  title: 'Qualcosa non ha funzionato',
  subTitle: 'Riprova più tardi.',
  trackProperties: {
    name: '',
    properties: {
      event_category: 'KO',
      reason: 'generic_error',
    },
  },
};

export const generateGenericError = (
  name: 'CDC_BONUS_GENERATION_ERROR' | 'CDC_BONUS_SHOW_DETAIL_ERROR',
) => ({
  ...DEFAULT_GENERIC_ERROR,
  trackProperties: {
    ...DEFAULT_GENERIC_ERROR.trackProperties,
    name,
  },
});

const CONFIG_GENERATE: Record<number, TrackConfig> = {
  400: generateGenericError('CDC_BONUS_GENERATION_ERROR'),
  500: generateGenericError('CDC_BONUS_GENERATION_ERROR'),
  503: {
    icon: 'umbrella',
    title: 'Al momento non riusciamo a generare il buono',
    subTitle: 'Riprova più tardi.',
    trackProperties: {
      name: 'CDC_BONUS_GENERATION_ERROR',
      properties: {
        event_category: 'KO',
        reason: 'service_not_available',
      },
    },
  },
};

const CONFIG_RETRIEVE: Record<number, TrackConfig> = {
  400: generateGenericError('CDC_BONUS_GENERATION_ERROR'),
  500: generateGenericError('CDC_BONUS_SHOW_DETAIL_ERROR'),
  503: {
    icon: 'umbrella',
    title: 'Al momento non riusciamo a recuperare il buono',
    subTitle: 'Riprova più tardi.',
    trackProperties: {
      name: 'CDC_BONUS_SHOW_DETAIL_ERROR',
      properties: {
        event_category: 'KO',
        reason: 'service_not_available',
      },
    },
  },
};

export const CONFIG_BY_STATUS = {
  CDC_BONUS_SHOW_DETAIL_ERROR: CONFIG_RETRIEVE,
  CDC_BONUS_GENERATION_ERROR: CONFIG_GENERATE,
};

export type CONFIG_KEYS = keyof typeof CONFIG_BY_STATUS;
