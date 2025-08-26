import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestedYearsList, SessionParams, SessionResponseDTO, YearsList } from './model';
import {
  CreateBonusRequestDTO,
  DeleteBonusResponseDTO,
  GetBonusByIdResponseDTO,
  GetBonusResponseDTO,
  GetCardsResponseDTO,
  RequestBonusDto,
} from './dto';
import { RootState } from '../store';
import { retrieveSessionQueryCached } from './utils';
import { API_DASHBOARD, API_REQUEST } from './api';

const BASE_URL = import.meta.env.VITE_BASE_URL;

enum API_ENV_OPTIONS {
  DEV = 'DEV',
  PROD = 'PROD',
}

const API_ENV = API_ENV_OPTIONS.DEV;

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
    //REQUEST APP APIS
    getSession: builder.query<SessionResponseDTO, SessionParams>({
      ...API_REQUEST[API_ENV].getSession,
      providesTags: (_, __, { id }, ___) => [{ type: 'getSession' as const, id }],
    }),
    getYearsList: builder.query<YearsList, void>({
      ...API_REQUEST[API_ENV].getYearsList,
    }),
    getNotAvailableYearsList: builder.query<RequestedYearsList, void>({
      ...API_REQUEST[API_ENV].getNotAvailableYearsList,
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      ...API_REQUEST[API_ENV].requestBonus,
    }),
    // DASHBOARD APP APIS
    getBonusById: builder.query<GetBonusByIdResponseDTO, string>({
      ...API_DASHBOARD[API_ENV].getBonusById,
    }),
    getCards: builder.query<GetCardsResponseDTO, void>({
      ...API_DASHBOARD[API_ENV].getCards,
    }),
    getBonus: builder.query<GetBonusResponseDTO, void>({
      ...API_DASHBOARD[API_ENV].getBonus,
    }),
    createBonus: builder.mutation<string, CreateBonusRequestDTO>({
      ...API_DASHBOARD[API_ENV].createBonus,
    }),
    deleteBonus: builder.mutation<DeleteBonusResponseDTO, string>({
      ...API_DASHBOARD[API_ENV].deleteBonus,
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
  useGetBonusByIdQuery,
  useGetCardsQuery,
  useGetBonusQuery,
  useCreateBonusMutation,
  useDeleteBonusMutation,
} = appApi;
