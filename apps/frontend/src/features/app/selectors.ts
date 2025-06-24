import { createSelector } from '@reduxjs/toolkit';
import { endpoints } from './services';
import { retrieveSessionQueryCached } from './utils';

export const selectYearsResult = endpoints.getYearsList.select();

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
