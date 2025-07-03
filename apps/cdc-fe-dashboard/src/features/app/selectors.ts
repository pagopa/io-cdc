import { createSelector } from '@reduxjs/toolkit';
import { endpoints } from './services';
import { RootState } from '../store';

export const selectCardSelected = (state: RootState) => state.appState.selectedCard;

export const selectCardsList = endpoints.getCards.select();

export const selectCardsListOptions = createSelector(
  selectCardsList,
  (cards) =>
    cards?.data?.reduce<Array<{ label: string; value: string }>>(
      (acc, { year, balance }) => (balance > 0 ? [...acc, { label: year, value: year }] : acc),
      [],
    ) ?? [],
);
