import { RootState } from './store';
import { SessionResponseDTO } from './types/sessionDTO';

export const retrieveSessionQueryCached = (state: RootState) => {
  const entries = Object.entries(state.app.queries);
  const sessionQuery = entries.find(
    ([key, value]) => value && key.startsWith('getSession') && value.status === 'fulfilled',
  )?.[1];
  if (!sessionQuery) return undefined;

  return sessionQuery?.data as SessionResponseDTO;
};
