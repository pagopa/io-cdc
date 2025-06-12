import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestedYearsList, SessionParams, SessionResponseDTO, YearsList } from './model';
import { RequestBonusDto } from './dto';

export const appApi = createApi({
  reducerPath: 'app',
  baseQuery: fetchBaseQuery({
    //TODO -> move this to envs
    baseUrl: 'https://api-app.io.pagopa.it/api/cdc/v1/',
    prepareHeaders: (headers) => {
      // TODO think to save in global state, this way we can even refresh an active session safely
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('token', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSession: builder.query<SessionResponseDTO, SessionParams>({
      query: ({ id }) => ({
        url: '/authorize',
        params: { id },
      }),
    }),
    getYearsList: builder.query<YearsList, void>({
      query: () => 'years',
    }),
    getNotAvailableYearsList: builder.query<RequestedYearsList, void>({
      query: () => 'card-requests',
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      query: (annualities) => ({
        url: '/card-requests',
        method: 'POST',
        body: annualities,
      }),
      // queryFn: async () => {
      //   const shouldFail = getRandomResponse();
      //   await delay(2000);
      //   if (shouldFail) {
      //     return {
      //       error: {
      //         status: 500,
      //         data: { message: 'Errore nella richiesta' },
      //       },
      //     };
      //   }
      //   return {
      //     data: { success: true },
      //   };
      // },
    }),
  }),
});

export const {
  useLazyGetSessionQuery,
  useGetSessionQuery,
  useGetYearsListQuery,
  useLazyGetYearsListQuery,
  endpoints,
  useRequestBonusMutation,
  useGetNotAvailableYearsListQuery,
  useLazyGetNotAvailableYearsListQuery,
} = appApi;
