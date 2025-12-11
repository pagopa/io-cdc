import { USERS_ROUTE } from './model';

export type SessionResponseDTO = {
  token: string;
  route: USERS_ROUTE;
};

export type GetSessionParamsRequestDTO = {
  id: string;
};
