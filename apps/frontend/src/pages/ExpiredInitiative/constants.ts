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
  image: 'timeout',
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
    image: 'hourglass',
    title: 'Il periodo per richiedere la Carta è terminato',
    description:
      "La valutazione della tua richiesta è in corso, attendi un messaggio su IO con l'esito entro il <gg> <mese>.",
    trackProperties: {
      webview: true,
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
  //TODO sentire michael per un potenziale errore da mappare nuovo
  502: {
    image: 'allYearsRequested',
    title: "Hai già richiesto Carta della Cultura, attenti l'esito",
    description: 'Riceverai un messaggio su IO entro il <gg> <mese>.',
    trackProperties: {
      webview: true,
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
};
