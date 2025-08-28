import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from './model';

type GenerateBonusState = {
  selectedCard: Pick<Card, 'balance' | 'year'>;
  amount: string;
};

const initialState: GenerateBonusState = {
  amount: '',
  selectedCard: {
    balance: 0,
    year: '',
  },
};

const generateBonusSlice = createSlice({
  name: 'generateBonus',
  initialState,
  reducers: {
    setSelectedCard: (state, { payload }: PayloadAction<GenerateBonusState['selectedCard']>) => {
      state.selectedCard = payload;
    },
    setAmount: (state, { payload }: PayloadAction<GenerateBonusState['amount']>) => {
      state.amount = payload;
    },
  },
});

export const generateBonusActions = generateBonusSlice.actions;
export const generateBonusReducer = generateBonusSlice.reducer;
