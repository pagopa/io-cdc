import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestedYearsList, SessionParams, SessionResponseDTO, YearsList } from './model';
import { RequestBonusDto } from './dto';
import { RootState } from '../store';
import { delay, getRandomError, getRandomResponse, retrieveSessionQueryCached } from './utils';
import { mockYears, mockYearsList } from './mock';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const appApi = createApi({
  reducerPath: 'app',
  tagTypes: ['getSession'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const data = retrieveSessionQueryCached(state);

      if (data && data.token) {
        headers.set('token', data.token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSession: builder.query<SessionResponseDTO, SessionParams>({
      queryFn: async () => {
        const shouldFail = getRandomResponse();
        await delay(2000);
        if (shouldFail) {
          return {
            error: {
              status: getRandomError(),
              data: { message: 'Unauthorized' },
            },
          };
        }
        return {
          data: {
            token: 'aiij182980wfyh3brfyw',
          },
        };
      },
      // query: ({ id }) => ({
      //   url: '/authorize',
      //   params: { id },
      // }),
      providesTags: (_, __, { id }, ___) => [{ type: 'getSession' as const, id }],
    }),
    getYearsList: builder.query<YearsList, void>({
      // query: () => 'years',
      queryFn: async () => {
        const shouldFail = getRandomResponse();
        await delay(2000);
        if (shouldFail) {
          return {
            error: {
              status: getRandomError(),
              data: { message: 'Non puoi richiedere la carta della cultura' },
            },
          };
        }
        return { data: mockYearsList };
      },
    }),
    getNotAvailableYearsList: builder.query<RequestedYearsList, void>({
      // query: () => 'card-requests',
      queryFn: async () => {
        const shouldFail = getRandomResponse();
        await delay(2000);
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
      // query: (annualities) => ({
      //   url: '/card-requests',
      //   method: 'POST',
      //   body: annualities,
      // }),
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
  useLazyGetSessionQuery,
  useGetSessionQuery,
  useGetYearsListQuery,
  useLazyGetYearsListQuery,
  endpoints,
  useRequestBonusMutation,
  useGetNotAvailableYearsListQuery,
  useLazyGetNotAvailableYearsListQuery,
} = appApi;
