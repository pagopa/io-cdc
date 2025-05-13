import { LogoType } from '@io-cdc/ui';

type ExpiredInitiativeConfig = Record<
  string,
  {
    image: LogoType;
    title: string;
    description: string | null;
  }
>;

export const EXPIRED_INITIATIVE_CONFIG_MAP: ExpiredInitiativeConfig = {
  expired: {
    image: 'initiativeExpired',
    title: 'Il periodo per richiedere la Carta della Cultura è terminato',
    description: null,
  },
  alreadyRequested: {
    image: 'initiativeExpired',
    title: 'Hai già richiesto la Carta per tutti gli anni disponibili',
    description: "Riceverai un messaggio su IO con l'esito della tua richiesta.",
  },
};
