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
  CreateVoucherResponseDTO,
  GetVouchersRequestQuery,
} from './dto';
import { RootState } from '../store';
import { retrieveSessionQueryCached } from './utils';
import { API_DASHBOARD, API_REQUEST } from './api';
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
      const state = getState() as RootState;
      const data = retrieveSessionQueryCached(state);
      const cachedSession = state.auth.token;

      if (!data && cachedSession) {
        headers.set('token', cachedSession);
      }

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
      keepUnusedDataFor: 1800,
    }),
    getYearsList: builder.query<GetYearsListResponseDTO, void>({
      ...API_REQUEST[API_ENV].getYearsList,
      keepUnusedDataFor: 3600,
    }),
    getNotAvailableYearsList: builder.query<GetNotAvailableYearsListResponseDTO, void>({
      ...API_REQUEST[API_ENV].getNotAvailableYearsList,
      keepUnusedDataFor: 3600,
    }),
    requestBonus: builder.mutation<{ success: boolean }, RequestBonusDto>({
      ...API_REQUEST[API_ENV].requestBonus,
    }),
    // DASHBOARD APP APIS
    getVoucherById: builder.query<GetBonusByIdResponseDTO, string>({
      ...API_DASHBOARD.getVoucherById,
    }),
    getCards: builder.query<GetCardsResponseDTO, void>({
      ...API_DASHBOARD.getCards,
    }),
    getVoucher: builder.query<GetVouchersResponseDTO, GetVouchersRequestQuery>({
      query: (year: string) => ({ url: 'vouchers', method: 'GET', params: { year } }),
    }),
    getAllVoucher: builder.query<GetVouchersResponseDTO, void>({
      ...API_DASHBOARD.getAllVouchers,
    }),
    createVoucher: builder.mutation<CreateVoucherResponseDTO, CreateVoucherRequestDTO>({
      query: (voucher: CreateVoucherRequestDTO) => ({
        url: '/vouchers',
        method: 'POST',
        body: voucher,
      }),
    }),
    deleteVoucher: builder.mutation<DeleteVoucherResponseDTO, string>({
      query: (id: string) => ({
        url: `/vouchers/${id}`,
        method: 'DELETE',
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
  useGetVoucherByIdQuery,
  useLazyGetVoucherByIdQuery,
  useGetCardsQuery,
  useLazyGetCardsQuery,
  useLazyGetVoucherQuery,
  useGetVoucherQuery,
  useCreateVoucherMutation,
  useDeleteVoucherMutation,
  useGetAllVoucherQuery,
} = appApi;
