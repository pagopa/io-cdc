import React from 'react';

const GenerateTicket = React.lazy(() => import('../pages/GenerateTicket'));

export enum APP_ROUTES {
  HOME = '/home',
  GENERATE_TICKET = '/genera-buono',
}

export const APP_ROUTES_CONFIG = [
  {
    path: APP_ROUTES.GENERATE_TICKET,
    Element: GenerateTicket,
  },
];
