import { RootState } from '../store';
import { SessionResponseDTO } from './model';

export const getRandomResponse = () => {
  return Math.random() < 0.2;
};
export const getRandomError = () => {
  const codes = [500, 501, 502];
  const index = Math.floor(Math.random() * codes.length);
  return codes[index];
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const retrieveSessionQueryCached = (state: RootState) => {
  const entries = Object.entries(state.app.queries);
  const sessionQuery = entries.find(
    ([key, value]) => value && key.startsWith('getSession') && value.status === 'fulfilled',
  )?.[1];
  if (!sessionQuery) return undefined;

  return sessionQuery?.data as SessionResponseDTO;
};
