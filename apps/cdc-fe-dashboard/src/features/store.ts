import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './app/services';
import { appStateReducer } from './app/reducer';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    appState: appStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
