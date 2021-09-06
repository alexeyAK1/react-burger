import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICurrentIngredientState } from '../models/app-store';
import { IIngredientsItem } from '../models/ingredients';

const initialState: ICurrentIngredientState = {
  currentIngredient: null,
};

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient(
      state,
      action: PayloadAction<IIngredientsItem | null>
    ) {
      state.currentIngredient = action.payload;
    },
  },
});

export default currentIngredientSlice.reducer;

export const { setCurrentIngredient } = currentIngredientSlice.actions;
