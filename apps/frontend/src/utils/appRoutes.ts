import React from 'react';
import { featureFlags } from './featureFlags';

const ExpiredInitiative = React.lazy(() => import('../pages/ExpiredInitiative'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));
const Feedback = React.lazy(() => import('../pages/Feedback'));
const TicketFeedback = React.lazy(() => import('../pages/TicketFeedback'));
const SelectYear = React.lazy(() => import('../pages/SelectYear'));
const SelectCardGenerateTicket = React.lazy(() => import('../pages/SelectCardGenerateTicket'));
const SelectAmountGenerateTicket = React.lazy(() => import('../pages/SelectAmountGenerateTicket'));
const BonusDetail = React.lazy(() => import('../pages/BonusDetail'));
const BonusList = React.lazy(() => import('../pages/BonusList'));

export enum APP_ROUTES {
  AUTHORIZE = '/authorize',
  HOME = '/',
  SELECT_CARD = '/genera-buono/seleziona-carta',
  SELECT_AMOUNT = '/genera-buono/seleziona-importo',
  BONUS_DETAIL = '/dettaglio-buono/:id',
  BONUS_LIST = '/lista-buoni',
  SELECT_YEAR = '/scelta-anno',
  FEEDBACK = '/esito',
  EXPIRED = '/iniziativa-scaduta',
  UNAUTHORIZED = '/unauthorized',
  TICKET_FEEDBACK = '/ticket-feedback',
  NOT_FOUND = '/not-found',
}

type APP_ROUTES_CONFIG_TYPE = {
  path: APP_ROUTES;
  Element: React.LazyExoticComponent<() => JSX.Element>;
};

const APP_ROUTES_REQUEST: APP_ROUTES_CONFIG_TYPE[] = [
  {
    path: APP_ROUTES.SELECT_YEAR,
    Element: SelectYear,
  },
  {
    path: APP_ROUTES.FEEDBACK,
    Element: Feedback,
  },
  {
    path: APP_ROUTES.EXPIRED,
    Element: ExpiredInitiative,
  },
  {
    path: APP_ROUTES.UNAUTHORIZED,
    Element: Unauthorized,
  },
];

const APP_ROUTES_DASHBOARD: APP_ROUTES_CONFIG_TYPE[] = [
  {
    path: APP_ROUTES.SELECT_CARD,
    Element: SelectCardGenerateTicket,
  },
  {
    path: APP_ROUTES.SELECT_AMOUNT,
    Element: SelectAmountGenerateTicket,
  },
  {
    path: APP_ROUTES.BONUS_DETAIL,
    Element: BonusDetail,
  },
  {
    path: APP_ROUTES.BONUS_LIST,
    Element: BonusList,
  },
  {
    path: APP_ROUTES.TICKET_FEEDBACK,
    Element: TicketFeedback,
  },
];

const APP_ROUTES_CONFIG = {
  REQUEST: APP_ROUTES_REQUEST,
  DASHBOARD: APP_ROUTES_DASHBOARD,
};

export const getAppRoutes = () => {
  const { dashboard, request } = featureFlags;
  if (request) return APP_ROUTES_CONFIG.REQUEST;
  return dashboard ? APP_ROUTES_CONFIG.DASHBOARD : [];
};
