import { IconType } from '@io-cdc/ui';

type CardsEmptyConfig = {
  title: string;
  subTitle: string | undefined;
  icon: IconType;
};

export const CARDS_EMPTY_STATE_CONFIG: CardsEmptyConfig = {
  icon: 'emptyCard',
  title: 'Carta della Cultura non è disponibile per il tuo profilo',
  subTitle: 'La tua richiesta non è stata accolta o non risultano richieste per il tuo profilo',
  //   trackProperties: {
  //     name: 'CDC_BONUS_SHOW_DETAIL_ERROR',
  //     properties: {
  //       event_category: 'KO',
  //       reason: 'service_not_available',
  //     },
  //   },
};
