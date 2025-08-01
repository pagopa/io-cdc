import { IconType } from '@io-cdc/ui';

export type FeedbackState = {
  status: keyof typeof CONFIG_BY_STATUS;
};

type TrackEventProperties =
  | {
      name: 'CDC_REQUEST_FAILURE';
      properties: {
        webview: true;
        reason: 'service_not_available' | 'generic_error';
        event_category: 'KO';
      };
    }
  | {
      name: 'CDC_REQUEST_UX_SUCCESS';
      properties: {
        webview: true;
        event_category: 'UX';
        event_type: 'screen_view';
      };
    };

export const CONFIG_BY_STATUS: Record<
  number,
  {
    title: string;
    subTitle: string;
    icon: IconType;
    trackProperties: TrackEventProperties;
    description?: string;
  }
> = {
  200: {
    title: 'Fatto!',
    icon: 'party',
    subTitle: "Riceverai un messaggio su IO con l'esito della tua richiesta.",
    description:
      'Per non perderti i messaggi in app, attiva le notifiche push da Impostazioni > Preferenze',
    trackProperties: {
      name: 'CDC_REQUEST_UX_SUCCESS',
      properties: {
        webview: true,
        event_category: 'UX',
        event_type: 'screen_view',
      },
    },
  },
  503: {
    icon: 'umbrella',
    title: 'Non riusciamo ad inviare la tua richiesta al momento',
    subTitle: 'Riprova più tardi.',
    trackProperties: {
      name: 'CDC_REQUEST_FAILURE',
      properties: {
        event_category: 'KO',
        webview: true,
        reason: 'service_not_available',
      },
    },
  },
  500: {
    icon: 'umbrella',
    title: 'Qualcosa non ha funzionato',
    subTitle: 'Riprova più tardi.',
    trackProperties: {
      name: 'CDC_REQUEST_FAILURE',
      properties: {
        event_category: 'KO',
        webview: true,
        reason: 'generic_error',
      },
    },
  },
};
