import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { retrieveSessionQueryCached } from '../utils';
import { GetSessionParamsRequestDTO, SessionResponseDTO } from '../types/sessionDTO';
import {
  GetNotAvailableYearsListResponseDTO,
  GetYearsListResponseDTO,
  RequestBonusRequestDTO,
  RequestBonusResponseDTO,
} from '../types/cdcRequestsDTO';
import {
  CreateVoucherRequestDTO,
  CreateVoucherResponseDTO,
  DeleteVoucherResponseDTO,
  GetBonusByIdResponseDTO,
  GetCardsResponseDTO,
  GetVouchersRequestQuery,
  GetVouchersResponseDTO,
} from '../types/cdcUsageDTO';

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
    //SESSION APP API
    getSession: builder.query<SessionResponseDTO, GetSessionParamsRequestDTO>({
      query: ({ id }: GetSessionParamsRequestDTO): string | FetchArgs => ({
        url: '/authorize',
        params: { id },
      }),
      providesTags: (_, __, { id }, ___) => [{ type: 'getSession' as const, id }],
      keepUnusedDataFor: 1800,
    }),
    //REQUEST APP APIS
    getYearsList: builder.query<GetYearsListResponseDTO, void>({
      query: () => 'years',
      keepUnusedDataFor: 3600,
    }),
    getNotAvailableYearsList: builder.query<GetNotAvailableYearsListResponseDTO, void>({
      query: () => 'card-requests',
      keepUnusedDataFor: 3600,
    }),
    requestBonus: builder.mutation<RequestBonusResponseDTO, RequestBonusRequestDTO>({
      query: () => 'card-requests',
    }),
    // DASHBOARD APP APIS
    getVoucherById: builder.query<GetBonusByIdResponseDTO, string>({
      query: (id: string) => `/vouchers/${id}`,
    }),
    getCards: builder.query<GetCardsResponseDTO, void>({
      query: () => 'cards',
    }),
    getVoucher: builder.query<GetVouchersResponseDTO, GetVouchersRequestQuery>({
      query: (year: string) => ({ url: 'vouchers', method: 'GET', params: { year } }),
    }),
    getAllVoucher: builder.query<GetVouchersResponseDTO, void>({
      query: () => 'vouchers',
      keepUnusedDataFor: 0,
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
  useLazyGetAllVoucherQuery,
} = appApi;
