import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  redirectToken?: string;
  token?: string;
  route?: string;
  deviceId?: string;
  savedAt?: number;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{
        redirectToken: string;
        token: string;
        route?: string;
        deviceId?: string;
      }>,
    ) => {
      state.redirectToken = action.payload.redirectToken;
      state.token = action.payload.token;
      state.route = action.payload.route;
      state.deviceId = action.payload.deviceId;
      state.savedAt = Date.now();
    },
    clearToken: (state) => {
      state.token = undefined;
      state.route = undefined;
      state.savedAt = undefined;
      state.redirectToken = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
