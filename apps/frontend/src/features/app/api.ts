import { FetchArgs } from '@reduxjs/toolkit/query';
import { SessionParams } from './model';
import { delay, getRandomError, getRandomResponse } from './utils';
import { mockYears, mockYearsList } from './mock';
import { CreateBonusRequestDTO, RequestBonusDto } from './dto';
import { apiMocks } from './apiMock';

export const API_REQUEST = {
  PROD: {
    getSession: {
      query: ({ id }: SessionParams): string | FetchArgs => ({
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
    getBonusById: {
      queryFn: (bonusId: string) => {
        return {
          data: apiMocks.getBonusById(bonusId),
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
    getBonus: {
      queryFn: () => {
        return {
          data: apiMocks.getBonus(),
        };
      },
    },
    createBonus: {
      queryFn: async (newBonus: CreateBonusRequestDTO) => {
        await delay(2500);
        return { data: apiMocks.createBonus(newBonus).id };
      },
    },
    deleteBonus: {
      queryFn: (bonusId: string) => {
        return {
          data: {
            deleted: true,
            bonusId,
          },
        };
      },
    },
  },
  DEV: {
    getBonusById: {
      queryFn: (bonusId: string) => {
        return {
          data: apiMocks.getBonusById(bonusId),
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
    getBonus: {
      queryFn: () => {
        return {
          data: apiMocks.getBonus(),
        };
      },
    },
    createBonus: {
      queryFn: async (newBonus: CreateBonusRequestDTO) => {
        await delay(2500);
        return { data: apiMocks.createBonus(newBonus).id };
      },
    },
    deleteBonus: {
      queryFn: (bonusId: string) => {
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
