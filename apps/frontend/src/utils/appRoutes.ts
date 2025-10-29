import React from 'react';

/**
 * TODO
 * For testing purposes, we need to load all routes in app. We could return back to previous logic when production environment is working
 */
// import { featureFlags } from './featureFlags';

// Request routes
const SelectYear = React.lazy(() => import('../pages/SelectYear'));
const FeedbackRequest = React.lazy(() => import('../pages/FeedbackRequest'));
const ExpiredInitiative = React.lazy(() => import('../pages/ExpiredInitiative'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));

// Usage routes
const Home = React.lazy(() => import('../pages/Home'));
const SelectCardGenerateTicket = React.lazy(() => import('../pages/SelectCardGenerateTicket'));
const SelectAmountGenerateTicket = React.lazy(() => import('../pages/SelectAmountGenerateTicket'));
const BonusDetail = React.lazy(() => import('../pages/BonusDetail'));
const BonusList = React.lazy(() => import('../pages/BonusList'));
const FeedbackVouchers = React.lazy(() => import('../pages/FeedbackVouchers'));
const CardsEmptyState = React.lazy(() => import('../pages/CardsEmptyState'));

// global route
const NotFound = React.lazy(() => import('../pages/NotFound'));

export enum APP_ROUTES {
  AUTHORIZE = '/authorize',
  HOME = '/',
  SELECT_CARD = '/genera-buono/seleziona-carta',
  SELECT_AMOUNT = '/genera-buono/seleziona-importo',
  BONUS_DETAIL = '/dettaglio-buono/:id',
  BONUS_LIST = '/lista-buoni',
  SELECT_YEAR = '/scelta-anno',
  FEEDBACK_REQUEST = '/esito',
  EXPIRED = '/iniziativa-scaduta',
  UNAUTHORIZED = '/unauthorized',
  FEEDBACK_VOUCHERS = '/voucher-feedback',
  CARDS_EMPTY = '/no-cards',
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
    path: APP_ROUTES.FEEDBACK_REQUEST,
    Element: FeedbackRequest,
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
    path: APP_ROUTES.HOME,
    Element: Home,
  },
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
    path: APP_ROUTES.FEEDBACK_VOUCHERS,
    Element: FeedbackVouchers,
  },
  {
    path: APP_ROUTES.CARDS_EMPTY,
    Element: CardsEmptyState,
  },
];

const APP_ROUTES_CONFIG = {
  REQUEST: APP_ROUTES_REQUEST,
  DASHBOARD: APP_ROUTES_DASHBOARD,
};

export const getAppRoutes = () => {
  // const { dashboard, request } = featureFlags;
  // if (request && !dashboard) return APP_ROUTES_CONFIG.REQUEST;
  // if (!request) return APP_ROUTES_CONFIG.DASHBOARD;
  return [
    ...APP_ROUTES_CONFIG.DASHBOARD,
    ...APP_ROUTES_CONFIG.REQUEST,
    { path: APP_ROUTES.NOT_FOUND, Element: NotFound },
  ];
};
