import { createSelector } from '@reduxjs/toolkit';
import { endpoints } from './services';
import { retrieveSessionQueryCached } from './utils';
import { RootState } from '../store';

const selectTickets = (state: RootState) => state.tickets;

export const selectYearsResult = endpoints.getYearsList.select();

export const selectTypologyResult = endpoints.getTypologies.select();

export const selectNotAvailableYearsResult = endpoints.getNotAvailableYearsList.select();

export const selectFirstSessionData = retrieveSessionQueryCached;

export const selectYearsList = createSelector(
  selectYearsResult,
  (yearsResult) => yearsResult?.data ?? [],
);

export const selectNotAvailableYears = createSelector(
  selectNotAvailableYearsResult,
  (notAvailableYears) => notAvailableYears?.data?.map(({ year }) => year) ?? [],
);

export const selectAnnualitiesWithStatus = createSelector(
  selectYearsList,
  selectNotAvailableYears,
  (available, notAvailable) =>
    available.map((year) => ({ label: year, value: year, disabled: notAvailable.includes(year) })),
);

export const selectActiveCard = createSelector(selectTickets, (state) => state.activeCard);

export const selectSelectedCardBonus = createSelector(selectTickets, (state) => state.selectedCard);

export const selectAmountBonus = createSelector(selectTickets, (state) => state.amount);

export const selectTypology = createSelector(selectTickets, (state) => state.typology);

export const selectTicketDeleted = createSelector(selectTickets, (state) => state?.deleted);
