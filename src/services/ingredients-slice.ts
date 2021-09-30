import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIngredientData } from "../api/agent";
import { bunName } from "../common/constants";
import { IIngredientsState } from "../models/app-store";
import { ICountIngredient, IIngredientsItem } from "../models/ingredients";
import { addOrDeleteCountIngredients, setErrorInAsyncThunk } from "./common";
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor
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
      setErrorInAsyncThunk(error as Error, dispatch, rejectWithValue);
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
    [getIngredientFetch.pending.toString()]: (state) => {
      state.isLoading = true;
    },
    [getIngredientFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [getIngredientFetch.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
    [addIngredientInConstructor.toString()]: (
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
    [deleteIngredientFromConstructor.toString()]: (
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
