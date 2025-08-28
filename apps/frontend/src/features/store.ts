import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './app/services';
import { generateBonusReducer } from './app/reducers';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer,
    generateBonus: generateBonusReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
