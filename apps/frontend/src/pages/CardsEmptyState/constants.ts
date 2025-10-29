import { IconType } from '@io-cdc/ui';

type CardsEmptyConfig = {
  title: string;
  subTitle: string | undefined;
  icon: IconType;
};

export const CARDS_EMPTY_STATE_CONFIG: CardsEmptyConfig = {
  icon: 'timeout',
  title: 'Non hai carte associate per il servizio Carta della Cultura',
  subTitle: undefined,
  //   trackProperties: {
  //     name: 'CDC_BONUS_SHOW_DETAIL_ERROR',
  //     properties: {
  //       event_category: 'KO',
  //       reason: 'service_not_available',
  //     },
  //   },
};
