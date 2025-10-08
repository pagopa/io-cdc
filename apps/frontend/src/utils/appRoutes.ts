import React from 'react';
import { featureFlags } from './featureFlags';

const ExpiredInitiative = React.lazy(() => import('../pages/ExpiredInitiative'));
const Unauthorized = React.lazy(() => import('../pages/Unauthorized'));
const FeedbackRequest = React.lazy(() => import('../pages/FeedbackRequest'));
const FeedbackVouchers = React.lazy(() => import('../pages/FeedbackVouchers'));
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
  FEEDBACK_REQUEST = '/esito',
  EXPIRED = '/iniziativa-scaduta',
  UNAUTHORIZED = '/unauthorized',
  FEEDBACK_VOUCHERS = '/voucher-feedback',
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
];

const APP_ROUTES_CONFIG = {
  REQUEST: APP_ROUTES_REQUEST,
  DASHBOARD: APP_ROUTES_DASHBOARD,
};

export const getAppRoutes = () => {
  const { dashboard, request } = featureFlags;
  if (request && !dashboard) return APP_ROUTES_CONFIG.REQUEST;
  if (!request) return APP_ROUTES_CONFIG.DASHBOARD;
  return [...APP_ROUTES_CONFIG.DASHBOARD, ...APP_ROUTES_CONFIG.REQUEST];
};
