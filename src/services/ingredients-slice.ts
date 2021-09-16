import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIngredientData } from "../api/agent";
import { bunName } from "../common/constants";
import { IIngredientsState } from "../models/app-store";
import { ICountIngredient, IIngredientsItem } from "../models/ingredients";
import { setAppError } from "./app-slice";
import { addOrDeleteCountIngredients } from "./common";
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
} from "./constructor-ingredients-slice";

const initialState: IIngredientsState = {
  ingredients: [],
  countIngredients: [],
  isLoading: false,
};

export const getIngredientFetch = createAsyncThunk(
  "ingredients/ingredientFetch",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const ingredientsData = await getIngredientData();

      dispatch(setIngredients(ingredientsData));
    } catch (error) {
      rejectWithValue(error);
      dispatch(setAppError(error as Error));
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<IIngredientsItem[]>) {
      state.ingredients = action.payload;
    },
    resetCountIngredients(state, action: PayloadAction<ICountIngredient[]>) {
      state.countIngredients = action.payload;
    },
  },
  extraReducers: {
    // @ts-expect-error
    [getIngredientFetch.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-expect-error
    [getIngredientFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getIngredientFetch.rejected]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [addIngredientInConstructor]: (
      state: IIngredientsState,
      action: PayloadAction<IIngredientsItem>
    ) => {
      if (action.payload.type !== bunName) {
        state.countIngredients = addOrDeleteCountIngredients(
          state,
          "add",
          action.payload._id
        );
      }
    },
    // @ts-expect-error
    [deleteIngredientFromConstructor]: (
      state: IIngredientsState,
      action: PayloadAction<IIngredientsItem>
    ) => {
      state.countIngredients = addOrDeleteCountIngredients(
        state,
        "delete",
        action.payload._id
      );
    },
  },
});

export default ingredientsSlice.reducer;

export const { setIngredients, resetCountIngredients } =
  ingredientsSlice.actions;
