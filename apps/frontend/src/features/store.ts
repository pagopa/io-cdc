import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './app/services';
import { ticketsReducer } from './app/reducers';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
