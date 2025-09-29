import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestedYearsList, SessionParams, SessionResponseDTO, YearsList } from './model';
import { RequestBonusDto } from './dto';
import { RootState } from '../store';
import { retrieveSessionQueryCached } from './utils';
import { API } from './api';
import { isEnvConfigEnabled } from '../../utils/isEnvConfigEnabled';

const BASE_URL = import.meta.env.VITE_BASE_URL;

enum API_ENV_OPTIONS {
  DEV = 'DEV',
  PROD = 'PROD',
}

const API_ENV = API_ENV_OPTIONS[isEnvConfigEnabled(import.meta.env.VITE_MOCK_API) ? 'DEV' : 'PROD'];

export const appApi = createApi({
  reducerPath: 'app',
  tagTypes: ['getSession'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log('🚀 ~ prepareHeaders -> headers before:', headers);
      const state = getState() as RootState;
      const data = retrieveSessionQueryCached(state);
      console.log('🚀 ~ prepareHeaders -> state:', { state, data });

      if (data && data.token) {
        headers.set('token', data.token);
      }
      console.log('🚀 ~ prepareHeaders -> headers after:', headers);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSession: builder.query<SessionResponseDTO, SessionParams>({
      ...API[API_ENV].getSession,
      providesTags: (_, __, { id }, ___) => [{ type: 'getSession' as const, id }],
      keepUnusedDataFor: 1800,
    }),
    getYearsList: builder.query<YearsList, void>({
      ...API[API_ENV].getYearsList,
      keepUnusedDataFor: 3600,
    }),
    getNotAvailableYearsList: builder.query<RequestedYearsList, void>({
      ...API[API_ENV].getNotAvailableYearsList,
      keepUnusedDataFor: 3600,
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      ...API[API_ENV].requestBonus,
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
