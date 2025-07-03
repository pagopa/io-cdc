// selectedSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CDC } from './model';

type AppState = {
  selectedCard: CDC | undefined;
};

const initialState: AppState = {
  selectedCard: undefined,
};

const appState = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setSelectedOption(state, action: PayloadAction<CDC>) {
      state.selectedCard = action.payload;
    },
  },
});

export const { setSelectedOption } = appState.actions;
export const appStateReducer = appState.reducer;
