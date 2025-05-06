import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { YearsList } from './model'
import { mockYears } from './mock'
import { getRandomError, getRandomResponse } from './utils'

export const appApi = createApi({
    reducerPath: 'app',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getYearsList: builder.query<YearsList, void>({
            queryFn: () => {
                const shouldFail = getRandomResponse()
                if(shouldFail){
                    return {
                        error: {
                            status: getRandomError(),
                            data: { message: 'Non puoi richiedere la carta della cultura' },
                          }
                    }
                }
                return { data: mockYears }
            }
        }),
        // requestYear: builder.mutation<{ success: boolean }, YearsList>({
        //     queryFn: async ({ year }) => {
        //         const shouldFail = getRandomResponse()

        //         if (shouldFail) {
        //             return {
        //                 error: {
        //                     status: getRandomError(),
        //                     data: { message: `Errore nella richiesta per l'anno ${year}` },
        //                 }
        //             }
        //         }

        //         return {
        //             data: { success: true }
        //         }
        //     }
        // }),
    }),
})


export const { useGetYearsListQuery, useLazyGetYearsListQuery, endpoints } = appApi