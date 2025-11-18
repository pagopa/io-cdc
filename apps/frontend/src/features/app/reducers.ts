import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, VOUCHER_TYPOLOGY } from './model';

type TicketsState = {
  activeCard: string;
  selectedCard: Pick<Card, 'residual_amount' | 'year'>;
  typology?: VOUCHER_TYPOLOGY;
  amount?: number;
  deleted: boolean;
};

const initialState: TicketsState = {
  activeCard: '',
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
    setActiveCard: (state, { payload }: PayloadAction<string>) => {
      state.activeCard = payload;
    },
    setSelectedCard: (state, { payload }: PayloadAction<TicketsState['selectedCard']>) => {
      state.selectedCard = payload;
    },
    setAmount: (state, { payload }: PayloadAction<TicketsState['amount']>) => {
      state.amount = payload;
    },
    setDeleted: (state, { payload }: PayloadAction<TicketsState['deleted']>) => {
      state.deleted = payload;
    },
    setTypology: (state, { payload }: PayloadAction<TicketsState['typology']>) => {
      state.typology = payload;
    },
    resetForm: (state) => {
      state.selectedCard = initialState.selectedCard;
      state.amount = undefined;
      state.typology = undefined;
    },
  },
});

export const ticketsActions = ticketsSlice.actions;
export const ticketsReducer = ticketsSlice.reducer;
