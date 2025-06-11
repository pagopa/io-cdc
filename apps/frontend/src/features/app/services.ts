import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { YearsList } from './model';
import { delay, getRandomResponse } from './utils';
import { RequestBonusDto } from './dto';

export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({
    //TODO -> move this to envs
    baseUrl: 'https://api-app.io.pagopa.it/api/cdc/v1/',
  }),
  endpoints: (builder) => ({
    getYearsList: builder.query<YearsList, void>({
      query: () => 'years',
    }),
    getNotAvailableYearsList: builder.query<YearsList, void>({
      queryFn: async () => {
        return { data: ['2020'] };
      },
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      queryFn: async () => {
        const shouldFail = getRandomResponse();
        await delay(2000);
        if (shouldFail) {
          return {
            error: {
              status: 500,
              data: { message: 'Errore nella richiesta' },
            },
          };
        }
        return {
          data: { success: true },
        };
      },
    }),
  }),
});

export const {
  useGetYearsListQuery,
  useLazyGetYearsListQuery,
  endpoints,
  useRequestBonusMutation,
  useGetNotAvailableYearsListQuery,
  useLazyGetNotAvailableYearsListQuery,
} = appApi;
