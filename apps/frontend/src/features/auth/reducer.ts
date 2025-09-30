import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token?: string;
  savedAt?: number;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.savedAt = Date.now();
    },
    clearToken: (state) => {
      state.token = undefined;
      state.savedAt = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
