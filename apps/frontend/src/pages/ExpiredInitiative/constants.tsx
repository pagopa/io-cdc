import { IconType } from '@io-cdc/ui';
import { ReactNode } from 'react';

type ExpiredInitiativeConfig = Record<
  number,
  {
    image: IconType;
    title: string;
    description: ReactNode | null;
    trackProperties: {
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
        con l&apos;esito entro il &lt;gg&gt; &lt;mese&gt;
      </span>
    ),
    trackProperties: {
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
  502: {
    image: 'allYearsRequested',
    title: "Hai già richiesto Carta della Cultura, attenti l'esito",
    description: (
      <span>
        <strong>Riceverai un messaggio su IO</strong> entro il &lt;gg&gt; &lt;mese&gt;
      </span>
    ),
    trackProperties: {
      already_requested: 'yes',
      event_category: 'KO',
    },
  },
};
