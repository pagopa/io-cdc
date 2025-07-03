import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseGetCardsDto } from './dto';
import { delay, getRandomResponse } from './utils';
import { mockCards } from './mock';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const appApi = createApi({
  reducerPath: 'app',
  tagTypes: ['getSession'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const state = getState() as RootState;
    //   const data = retrieveSessionQueryCached(state);

    //   if (data && data.token) {
    //     headers.set('token', data.token);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getCards: builder.query<ResponseGetCardsDto, void>({
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
          data: mockCards,
        };
      },
    }),
  }),
});

export const { endpoints, useGetCardsQuery } = appApi;
