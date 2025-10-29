import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from './model';

type TicketsState = {
  selectedCard: Pick<Card, 'residual_amount' | 'year'>;
  amount: number;
  deleted: boolean;
};

const initialState: TicketsState = {
  amount: 0,
  selectedCard: {
    residual_amount: 0,
    year: '',
  },
  deleted: false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSelectedCard: (state, { payload }: PayloadAction<TicketsState['selectedCard']>) => {
      state.selectedCard = payload;
    },
    setAmount: (state, { payload }: PayloadAction<TicketsState['amount']>) => {
      state.amount = payload;
    },
    setDeleted: (state, { payload }: PayloadAction<TicketsState['deleted']>) => {
      state.deleted = payload;
    },
    resetForm: (state) => {
      state.selectedCard = initialState.selectedCard;
      state.amount = initialState.amount;
    },
  },
});

export const ticketsActions = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;
