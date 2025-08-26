import React from 'react';

const ExpiredInitiative = React.lazy(() => import('../pages/ExpiredInitiative'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));
const Feedback = React.lazy(() => import('../pages/Feedback'));
const SelectYear = React.lazy(() => import('../pages/SelectYear'));
const GenerateTicket = React.lazy(() => import('../pages/GenerateTicket'));
const BonusDetail = React.lazy(() => import('../pages/BonusDetail'));
const BonusList = React.lazy(() => import('../pages/BonusList'));

export enum APP_ROUTES {
  AUTHOIRIZE = '/authorize',
  HOME = '/',
  GENERATE_TICKET = '/genera-buono',
  BONUS_DETAIL = '/dettaglio-buono/:id',
  BONUS_LIST = '/lista-buoni',
  SELECT_YEAR = '/scelta-anno',
  FEEDBACK = '/esito',
  EXPIRED = '/iniziativa-scaduta',
  UNAUTHORIZED = '/unauthorized',
}

type APP_ROUTES_CONFIG_TYPE = {
  path: APP_ROUTES;
  Element: React.LazyExoticComponent<() => JSX.Element>;
  flag: 'request' | 'dashboard';
};

const APP_ROUTES_REQUEST: APP_ROUTES_CONFIG_TYPE[] = [
  {
    path: APP_ROUTES.SELECT_YEAR,
    Element: SelectYear,
    flag: 'request',
  },
  {
    path: APP_ROUTES.FEEDBACK,
    Element: Feedback,
    flag: 'request',
  },
  {
    path: APP_ROUTES.EXPIRED,
    Element: ExpiredInitiative,
    flag: 'request',
  },
  {
    path: APP_ROUTES.UNAUTHORIZED,
    Element: Unauthorized,
    flag: 'request',
  },
];

const APP_ROUTES_DASHBOARD: APP_ROUTES_CONFIG_TYPE[] = [
  {
    path: APP_ROUTES.GENERATE_TICKET,
    Element: GenerateTicket,
    flag: 'dashboard',
  },
  {
    path: APP_ROUTES.BONUS_DETAIL,
    Element: BonusDetail,
    flag: 'dashboard',
  },
  {
    path: APP_ROUTES.BONUS_LIST,
    Element: BonusList,
    flag: 'dashboard',
  },
];

export const APP_ROUTES_CONFIG = [...APP_ROUTES_REQUEST, ...APP_ROUTES_DASHBOARD];
