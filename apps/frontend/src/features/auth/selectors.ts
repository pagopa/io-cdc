// features/auth/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const EXPIRE_TIME = 30 * 60 * 1000; // 30 minuti in ms

export const selectToken = (state: RootState) => state.auth.token;

export const selectIsTokenValid = ({ auth }: RootState) =>
  Boolean(auth.token && auth.savedAt && Date.now() - auth.savedAt < EXPIRE_TIME);

export const selectSessionRoute = ({ auth }: RootState) => auth?.route;

export const selectCachedSession = createSelector(
  selectToken,
  selectSessionRoute,
  (token, route) => ({ token, route }),
);
