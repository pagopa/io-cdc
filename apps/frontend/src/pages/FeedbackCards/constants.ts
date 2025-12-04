import { IconType } from '@io-cdc/ui';

type CardsFeedbackConfig = {
  title: string;
  subTitle: string | undefined;
  icon: IconType;
  trackProperties: {
    name: 'CDC_NOT_AVAILABLE' | 'CDC_CARD_DETAIL_ERROR';
    properties: {
      event_category: 'KO';
      event_type: 'error';
    };
  };
};

export const CARDS_FEEDBACK_CONFIG: Record<number, CardsFeedbackConfig> = {
  404: {
    icon: 'emptyCard',
    title: 'Carta della Cultura non è disponibile per il tuo profilo',
    subTitle: 'La tua richiesta non è stata accolta o non risultano richieste per il tuo profilo',
    trackProperties: {
      name: 'CDC_NOT_AVAILABLE',
      properties: {
        event_category: 'KO',
        event_type: 'error',
      },
    },
  },
  500: {
    icon: 'umbrella',
    title: 'Il dettaglio dell’iniziativa non è al momento disponibile',
    subTitle: "Riprova tra un po'",
    trackProperties: {
      name: 'CDC_CARD_DETAIL_ERROR',
      properties: {
        event_category: 'KO',
        event_type: 'error',
      },
    },
  },
};
