// features/auth/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const EXPIRE_TIME = 30 * 60 * 1000; // 30 minuti in ms

export const selectToken = (state: RootState) => state.auth.token;

export const selectSessionRoute = ({ auth }: RootState) => auth?.route;

export const selectSavedAt = ({ auth }: RootState) => auth?.savedAt;

export const selectRedirectToken = ({ auth }: RootState) => auth?.redirectToken;

export const selectIsTokenValid = createSelector(selectToken, selectSavedAt, (token, savedAt) =>
  Boolean(token && savedAt && Date.now() - savedAt < EXPIRE_TIME),
);

export const selectCachedSession = createSelector(
  selectToken,
  selectSessionRoute,
  selectRedirectToken,
  (token, route, redirectToken) => ({ token, route, redirectToken }),
);
