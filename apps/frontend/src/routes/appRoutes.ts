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

// Usage routes
const Home = React.lazy(() => import('../pages/Home'));
const BonusList = React.lazy(() => import('../pages/BonusList'));
const CourtesyPage = React.lazy(() => import('../pages/Courtesy'));
const BonusDetail = React.lazy(() => import('../pages/BonusDetail'));
const CardsEmptyState = React.lazy(() => import('../pages/CardsEmptyState'));
const FeedbackVouchers = React.lazy(() => import('../pages/FeedbackVouchers'));
const SelectCardGenerateTicket = React.lazy(() => import('../pages/SelectCardGenerateTicket'));
const SelectAmountGenerateTicket = React.lazy(() => import('../pages/SelectAmountGenerateTicket'));

// global route
const NotFound = React.lazy(() => import('../pages/NotFound'));
const Authorize = React.lazy(() => import('../pages/Authorize'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));

export enum APP_ROUTES {
  HOME = '/',
  AUTHORIZE = '/authorize',
  NOT_FOUND = '/not-found',
  CARDS_EMPTY = '/no-cards',
  COURTESY = '/courtesy-page',
  BONUS_LIST = '/lista-buoni',
  FEEDBACK_REQUEST = '/esito',
  SELECT_YEAR = '/scelta-anno',
  UNAUTHORIZED = '/unauthorized',
  EXPIRED = '/iniziativa-scaduta',
  BONUS_DETAIL = '/dettaglio-buono/:id',
  FEEDBACK_VOUCHERS = '/voucher-feedback',
  SELECT_CARD = '/genera-buono/seleziona-carta',
  SELECT_AMOUNT = '/genera-buono/seleziona-importo',
}

export type APP_ROUTES_CONFIG_TYPE = {
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
  {
    path: APP_ROUTES.COURTESY,
    Element: CourtesyPage,
  },
];

const GLOBAL_ROUTES: APP_ROUTES_CONFIG_TYPE[] = [
  { path: APP_ROUTES.AUTHORIZE, Element: Authorize },
  { path: APP_ROUTES.NOT_FOUND, Element: NotFound },
  {
    path: APP_ROUTES.UNAUTHORIZED,
    Element: Unauthorized,
  },
];

const APP_ROUTES_CONFIG = {
  REQUEST: APP_ROUTES_REQUEST,
  DASHBOARD: APP_ROUTES_DASHBOARD,
};

export const getAppRoutes = () => {
  // const { dashboard, request } = featureFlags;
  // if (request && !dashboard) return [...APP_ROUTES_CONFIG.REQUEST, ...GLOBAL_ROUTES];
  // if (!request) return [...APP_ROUTES_CONFIG.DASHBOARD, ...GLOBAL_ROUTES];
  return {
    protectedRoutes: [...APP_ROUTES_CONFIG.DASHBOARD, ...APP_ROUTES_CONFIG.REQUEST],
    global: GLOBAL_ROUTES,
  };
};
