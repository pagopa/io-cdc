import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card } from './model';

type TicketsState = {
  selectedCard: Pick<Card, 'balance' | 'year'>;
  amount: string;
  deleted: boolean;
};

const initialState: TicketsState = {
  amount: '',
  selectedCard: {
    balance: 0,
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
  },
});

export const ticketsActions = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;
