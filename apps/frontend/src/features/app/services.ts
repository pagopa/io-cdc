import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { YearsList } from './model';
import { mockYears } from './mock';
import { delay, getRandomError, getRandomResponse } from './utils';
import { RequestBonusDto } from './dto';

export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getYearsList: builder.query<YearsList, void>({
      queryFn: async () => {
        const shouldFail = getRandomResponse();
        await delay(4000);
        if (shouldFail) {
          return {
            error: {
              status: getRandomError(),
              data: { message: 'Non puoi richiedere la carta della cultura' },
            },
          };
        }
        return { data: mockYears };
      },
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      queryFn: async () => {
        const shouldFail = getRandomResponse();
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
} = appApi;
