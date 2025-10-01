import { IconType } from '@io-cdc/ui';
import { ReactNode } from 'react';

type ExpiredInitiativeConfig = Record<
  number,
  {
    image: IconType;
    title: string;
    description: ReactNode | null;
    trackName: 'CDC_REQUEST_EXPIRED' | 'CDC_REQUEST_ALREADY_APPLIED';
    trackProperties: {
      webview: true;
      already_requested?: 'yes' | 'no';
      event_category: 'KO';
    };
  }
>;

export const DEFAULT_CONFIG: ExpiredInitiativeConfig[number] = {
  image: 'timeout',
  title: 'Il periodo per richiedere la Carta della Cultura è terminato',
  description: null,
  trackName: 'CDC_REQUEST_ALREADY_APPLIED',
  trackProperties: {
    webview: true,
    already_requested: 'no',
    event_category: 'KO',
  },
};

export const EXPIRED_INITIATIVE_CONFIG_MAP: ExpiredInitiativeConfig = {
  500: DEFAULT_CONFIG,
  501: {
    image: 'hourglass',
    title: 'Il periodo per richiedere la Carta è terminato',
    description: (
      <span>
        La valutazione della tua richiesta è in corso, <strong>attendi un messaggio su IO</strong>{' '}
        con l&apos;esito
      </span>
    ),
    trackName: 'CDC_REQUEST_ALREADY_APPLIED',
    trackProperties: {
      webview: true,
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
  502: {
    image: 'allYearsRequested',
    title: "Hai già richiesto Carta della Cultura, attendi l'esito",
    description: 'Riceverai un messaggio su IO quando l’esito sarà pronto.',
    trackName: 'CDC_REQUEST_EXPIRED',
    trackProperties: {
      webview: true,
      event_category: 'KO',
    },
  },
};
