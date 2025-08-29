import { IconType } from '@io-cdc/ui';

export type FeedbackState = {
  status: keyof typeof CONFIG_BY_STATUS;
};

type TrackEventProperties = {
  properties: {
    reason: 'service_not_available' | 'generic_error';
    event_category: 'KO';
  };
};

const CONFIG_GENERATE: Record<
  number,
  {
    title: string;
    subTitle: string;
    icon: IconType;
    trackProperties: TrackEventProperties;
    description?: string;
  }
> = {
  503: {
    icon: 'umbrella',
    title: 'Al momento non riusciamo a generare il buono',
    subTitle: 'Riprova più tardi.',
    trackProperties: {
      properties: {
        event_category: 'KO',
        reason: 'service_not_available',
      },
    },
  },
};

const CONFIG_RETRIEVE: Record<
  number,
  {
    title: string;
    subTitle: string;
    icon: IconType;
    trackProperties: TrackEventProperties;
    description?: string;
  }
> = {
  503: {
    icon: 'umbrella',
    title: 'Al momento non riusciamo a recuperare il buono',
    subTitle: 'Riprova più tardi.',
    trackProperties: {
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
