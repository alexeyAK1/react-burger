import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrderData } from "../api/agent";
import { getNElementArr } from "../common/functions";
import { IOrderState, IRootStore } from "../models/app-store";
import { IOrder, IOrdersFeedWithIngredients } from "../models/order";
import {
  setBun,
  setIngredientsInConstructor
} from "./constructor-ingredients-slice";
import { resetCountIngredients } from "./ingredients-slice";

const initialState: IOrderState = {
  order: null,
  isLoading: false,
  orderFeed: null,
  orderFeedAll: null,
};

export const getOrderFetch = createAsyncThunk(
  "order/getOrderFetch",
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
      console.log(error);
      rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<IOrder | null>) {
      state.order = action.payload;
    },
    setOrderFeed(state, action: PayloadAction<IOrdersFeedWithIngredients | null>) {
      state.orderFeed = action.payload;
    },
    setOrderFeedAll(state, action: PayloadAction<IOrdersFeedWithIngredients | null>) {
      state.orderFeedAll = action.payload;
    },
  },
  extraReducers: {
    [getOrderFetch.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [getOrderFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [getOrderFetch.rejected.toString()]: (state, action: PayloadAction<Error>) => {
      state.isLoading = false;
      state.order = null;
      console.log(action.payload);
    },
  },
});

export default orderSlice.reducer;

const { setOrder } = orderSlice.actions;
export const { setOrderFeed, setOrderFeedAll } = orderSlice.actions;
