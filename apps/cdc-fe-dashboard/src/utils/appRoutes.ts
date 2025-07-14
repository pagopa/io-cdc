import React from 'react';

const GenerateTicket = React.lazy(() => import('../pages/GenerateTicket'));
const BonusDetail = React.lazy(() => import('../pages/BonusDetail'));

export enum APP_ROUTES {
  HOME = '/home',
  GENERATE_TICKET = '/genera-buono',
  BONUS_DETAIL = '/dettaglio-buono/:id',
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
];
