import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientData } from '../api/agent';
import { bunName } from '../common/constants';
import { IIngredientsState } from '../models/app-store';
import { IIngredientsItem } from '../models/ingredients';
import { setAppError } from './app-slice';
import { addOrDeleteCountIngredients } from './common';
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  setBun,
} from './constructor-ingredients-slice';

const initialState: IIngredientsState = {
  ingredients: [],
  countIngredients: [],
  isLoading: false,
};

export const ingredientFetch = createAsyncThunk(
  'ingredients/ingredientFetch',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const ingredientsData = await getIngredientData();
      const firstBunElement = ingredientsData.filter(
        (item) => item.type === bunName
      )[0];

      dispatch(setBun(firstBunElement));
      dispatch(setIngredients(ingredientsData));
    } catch (error) {
      rejectWithValue(error);
      dispatch(setAppError(error));
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<IIngredientsItem[]>) {
      state.ingredients = action.payload;
    },
    setIngredientsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // @ts-expect-error
    [ingredientFetch.pending]: (state) => {
      state.isLoading = true;
    },
    // @ts-expect-error
    [ingredientFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [ingredientFetch.rejected]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [addIngredientInConstructor]: (
      state,
      action: PayloadAction<IIngredientsItem>
    ) => {
      if (action.payload.type !== bunName) {
        state.countIngredients = addOrDeleteCountIngredients(
          state,
          'add',
          action.payload._id
        );
      }
    },
    // @ts-expect-error
    [deleteIngredientFromConstructor]: (
      state,
      action: PayloadAction<IIngredientsItem>
    ) => {
      state.countIngredients = addOrDeleteCountIngredients(
        state,
        'delete',
        action.payload._id
      );
    },
  },
});

export default ingredientsSlice.reducer;

export const { setIngredients, setIngredientsLoading } =
  ingredientsSlice.actions;
