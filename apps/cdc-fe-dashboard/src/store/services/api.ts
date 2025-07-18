import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiMocks } from './apiMock';
import {
  CreateBonusRequestDTO,
  DeleteBonusResponseDTO,
  GetBonusByIdResponseDTO,
  GetBonusResponseDTO,
  GetCardsResponseDTO,
} from './dto';
import { delay } from '../../utils/common';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
    prepareHeaders: async (headers) => {
      //TODO -> add token
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBonusById: builder.query<GetBonusByIdResponseDTO, string>({
      queryFn: (bonusId: string) => {
        return {
          data: apiMocks.getBonusById(bonusId),
        };
      },
    }),
    getCards: builder.query<GetCardsResponseDTO, void>({
      queryFn: () => {
        return {
          data: apiMocks.getCards(),
        };
      },
    }),
    getBonus: builder.query<GetBonusResponseDTO, void>({
      queryFn: () => {
        return {
          data: apiMocks.getBonus(),
        };
      },
    }),
    createBonus: builder.mutation<string, CreateBonusRequestDTO>({
      queryFn: async (newBonus) => {
        await delay(2500);
        return { data: apiMocks.createBonus(newBonus).id };
      },
    }),
    deleteBonus: builder.mutation<DeleteBonusResponseDTO, string>({
      queryFn: (bonusId) => {
        return {
          data: {
            deleted: true,
            bonusId,
          },
        };
      },
    }),
  }),
});

export const {
  useGetBonusByIdQuery,
  useGetCardsQuery,
  useGetBonusQuery,
  useCreateBonusMutation,
  useDeleteBonusMutation,
} = api;
