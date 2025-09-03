import { FetchArgs } from '@reduxjs/toolkit/query';
import { delay, getRandomError, getRandomResponse } from './utils';
import { mockYears, mockYearsList } from './mock';
import { CreateVoucherRequestDTO, GetSessionParamsRequestDTO, RequestBonusDto } from './dto';
import { apiMocks } from './apiMock';

export const API_REQUEST = {
  PROD: {
    getSession: {
      query: ({ id }: GetSessionParamsRequestDTO): string | FetchArgs => ({
        url: '/authorize',
        params: { id },
      }),
    },
    getYearsList: {
      query: () => 'years',
    },
    getNotAvailableYearsList: {
      query: () => 'card-requests',
    },
    requestBonus: {
      query: (annualities: RequestBonusDto) => ({
        url: '/card-requests',
        method: 'POST',
        body: annualities,
      }),
    },
  },
  DEV: {
    getSession: {
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
    },
    getYearsList: {
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
    },
    getNotAvailableYearsList: {
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
    },
    requestBonus: {
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
    },
  },
};

export const API_DASHBOARD = {
  PROD: {
    getCards: {
      query: () => 'cards',
    },
    getVouchers: {
      query: () => 'vouchers',
    },
    getVoucherById: {
      query: (id: string) => `/vouchers/${id}`,
    },
    createVoucher: {
      query: (voucher: CreateVoucherRequestDTO) => ({
        url: '/vouchers',
        method: 'POST',
        body: voucher,
      }),
    },
    deleteVoucher: {
      query: (id: string) => ({
        url: `/vouchers/${id}`,
        method: 'DELETE',
      }),
    },
  },
  DEV: {
    getVoucherById: {
      queryFn: async (bonusId: string) => {
        const shouldFail = getRandomResponse();
        await delay(2000);
        if (shouldFail) {
          return {
            error: {
              status: 503,
              data: { message: 'Unauthorized' },
            },
          };
        }
        return {
          data: apiMocks.getVoucherById(bonusId),
        };
      },
    },
    getCards: {
      queryFn: () => {
        return {
          data: apiMocks.getCards(),
        };
      },
    },
    getVouchers: {
      queryFn: () => {
        return {
          data: apiMocks.getVouchers(),
        };
      },
    },
    createVoucher: {
      queryFn: async (newBonus: CreateVoucherRequestDTO) => {
        const shouldFail = getRandomResponse();
        await delay(2000);
        if (shouldFail) {
          return {
            error: {
              status: 503,
              data: { message: 'Unauthorized' },
            },
          };
        }
        await delay(2500);
        return { data: apiMocks.createVoucher(newBonus).id };
      },
    },
    deleteVoucher: {
      queryFn: async (bonusId: string) => {
        const shouldFail = getRandomResponse();
        await delay(2000);
        if (shouldFail) {
          return {
            error: {
              status: 503,
              data: { message: 'Unauthorized' },
            },
          };
        }
        return {
          data: {
            deleted: true,
            bonusId,
          },
        };
      },
    },
  },
};
