import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderData } from '../api/agent';
import { getNElementArr } from '../common/functions';
import { IOrderState, IRootStore } from '../models/app-store';
import { IOrder } from '../models/order';
import { setBun, setIngredientsInConstructor } from './constructor-ingredients-slice';
import { resetCountIngredients } from './ingredients-slice';

const initialState: IOrderState = {
  order: null,
  isLoading: false,
};

export const getOrderFetch = createAsyncThunk(
  'order/getOrderFetch',
  async function (_, { rejectWithValue, dispatch, getState }) {
    try {
      const {
        constructorIngredients: { constructorIngredients, bun },
      } = getState() as IRootStore;
      const getIngredientIds = () =>
        constructorIngredients.map((item) => item._id);
      const ingredients = [
        ...getIngredientIds(),
        ...getNElementArr(2, bun?._id),
      ];

      const orderData = await getOrderData(ingredients);
      dispatch(setOrder(orderData));
      dispatch(setBun(null));
      dispatch(setIngredientsInConstructor([]));
      dispatch(resetCountIngredients([]));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<IOrder | null>) {
      state.order = action.payload;
    },
  },
  extraReducers: {
    // @ts-expect-error
    [getOrderFetch.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-expect-error
    [getOrderFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getOrderFetch.rejected]: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.order = null;
      console.log(action.payload);
    },
  },
});

export default orderSlice.reducer;

const { setOrder } = orderSlice.actions;
