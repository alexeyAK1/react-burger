import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderState } from '../models/app-store';
import { IOrder } from '../models/order';

const initialState: IOrderState = {
  order: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<IOrder | null>) {
      state.order = action.payload;
    },
  },
});

export default orderSlice.reducer;

export const { setOrder } = orderSlice.actions;
