import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateVoucherRequestDTO,
  DeleteVoucherResponseDTO,
  GetBonusByIdResponseDTO,
  GetVouchersResponseDTO,
  GetCardsResponseDTO,
  RequestBonusDto,
  SessionResponseDTO,
  GetYearsListResponseDTO,
  GetNotAvailableYearsListResponseDTO,
  GetSessionParamsRequestDTO,
} from './dto';
import { RootState } from '../store';
import { retrieveSessionQueryCached } from './utils';
import { API_DASHBOARD, API_REQUEST } from './api';

const BASE_URL = import.meta.env.VITE_BASE_URL;

enum API_ENV_OPTIONS {
  DEV = 'DEV',
  PROD = 'PROD',
}

// TODO change to PROD
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
    getSession: builder.query<SessionResponseDTO, GetSessionParamsRequestDTO>({
      ...API_REQUEST[API_ENV].getSession,
      providesTags: (_, __, { id }, ___) => [{ type: 'getSession' as const, id }],
    }),
    getYearsList: builder.query<GetYearsListResponseDTO, void>({
      ...API_REQUEST[API_ENV].getYearsList,
    }),
    getNotAvailableYearsList: builder.query<GetNotAvailableYearsListResponseDTO, void>({
      ...API_REQUEST[API_ENV].getNotAvailableYearsList,
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      ...API_REQUEST[API_ENV].requestBonus,
    }),
    // DASHBOARD APP APIS
    getVoucherById: builder.query<GetBonusByIdResponseDTO, string>({
      ...API_DASHBOARD[API_ENV].getVoucherById,
    }),
    getCards: builder.query<GetCardsResponseDTO, void>({
      ...API_DASHBOARD[API_ENV].getCards,
    }),
    getVoucher: builder.query<GetVouchersResponseDTO, void>({
      ...API_DASHBOARD[API_ENV].getVouchers,
    }),
    createVoucher: builder.mutation<string, CreateVoucherRequestDTO>({
      ...API_DASHBOARD[API_ENV].createVoucher,
    }),
    deleteVoucher: builder.mutation<DeleteVoucherResponseDTO, string>({
      ...API_DASHBOARD[API_ENV].deleteVoucher,
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
  useGetVoucherByIdQuery,
  useGetCardsQuery,
  useGetVoucherQuery,
  useCreateVoucherMutation,
  useDeleteVoucherMutation,
} = appApi;
