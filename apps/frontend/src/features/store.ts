import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './app/services';
import { ticketsReducer } from './app/reducers';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'savedAt'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [appApi.reducerPath]: appApi.reducer,
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
        ],
      },
    }).concat(appApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
