import { IconType } from '@io-cdc/ui';

type ExpiredInitiativeConfig = Record<
  number,
  {
    image: IconType;
    title: string;
    description: string | null;
    trackProperties: {
      webview: true;
      already_requested: 'yes' | 'no';
      event_category: 'KO';
    };
  }
>;

export const DEFAULT_CONFIG: ExpiredInitiativeConfig[number] = {
  image: 'initiativeExpired',
  title: 'Il periodo per richiedere la Carta della Cultura è terminato',
  description: null,
  trackProperties: {
    webview: true,
    already_requested: 'no',
    event_category: 'KO',
  },
};

export const EXPIRED_INITIATIVE_CONFIG_MAP: ExpiredInitiativeConfig = {
  500: DEFAULT_CONFIG,
  501: {
    image: 'allYearsRequested',
    title: 'Hai già richiesto la Carta per tutti gli anni disponibili',
    description: "Riceverai un messaggio su IO con l'esito della tua richiesta.",
    trackProperties: {
      webview: true,
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
};
