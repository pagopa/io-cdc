import React from 'react';

const GenerateTicket = React.lazy(() => import('../pages/GenerateTicket'));
const BonusDetail = React.lazy(() => import('../pages/BonusDetail'));
const BonusList = React.lazy(() => import('../pages/BonusList'));

export enum APP_ROUTES {
  HOME = '/',
  GENERATE_TICKET = '/genera-buono',
  BONUS_DETAIL = '/dettaglio-buono/:id',
  BONUS_LIST = '/lista-buoni',
}

export const APP_ROUTES_CONFIG = [
  {
    path: APP_ROUTES.GENERATE_TICKET,
    Element: GenerateTicket,
  },
  {
    path: APP_ROUTES.BONUS_DETAIL,
    Element: BonusDetail,
  },
  {
    path: APP_ROUTES.BONUS_LIST,
    Element: BonusList,
  },
];
