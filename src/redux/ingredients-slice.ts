import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bunName } from '../common/constants';
import { IIngredientsState } from '../models/app-store';
import { IIngredientsItem } from '../models/ingredients';
import { addOrDeleteCountIngredients } from './common';
import {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
} from './constructor-ingredients-slice';

const initialState: IIngredientsState = {
  ingredients: [],
  countIngredients: [],
  isLoading: false,
};

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
