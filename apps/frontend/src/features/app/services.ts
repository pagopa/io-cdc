import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestedYearsList, SessionParams, SessionResponseDTO, YearsList } from './model';
import { RequestBonusDto } from './dto';
import { RootState } from '../store';
import { retrieveSessionQueryCached } from './utils';

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
      query: ({ id }) => ({
        url: '/authorize',
        params: { id },
      }),
      providesTags: (_, __, { id }, ___) => [{ type: 'getSession' as const, id }],
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
