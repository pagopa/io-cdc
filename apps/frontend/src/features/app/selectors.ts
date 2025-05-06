import { createSelector } from "@reduxjs/toolkit";
import { endpoints } from "./services";

export const selectYearsResult = endpoints.getYearsList.select()

export const selectYearsList = createSelector(
    selectYearsResult,
    yearsResult => yearsResult?.data ?? []
)
