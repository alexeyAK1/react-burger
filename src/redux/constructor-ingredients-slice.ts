import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bunName } from '../common/constants';
import { IConstructorIngredientState } from '../models/app-store';
import { IIngredientsItem } from '../models/ingredients';
import { calculateTotalPrice, getNewElementConstructor } from './common';

const initialState: IConstructorIngredientState = {
  bun: null,
  constructorIngredients: [],
  totalSum: 0,
};

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<IIngredientsItem>) {
      console.log(22);
      state.bun = action.payload;
      state.totalSum = calculateTotalPrice(state);
    },
    calculateTotal(state) {
      state.totalSum = calculateTotalPrice(state);
    },
    addIngredientInConstructor(state, action: PayloadAction<IIngredientsItem>) {
      if (action.payload.type === bunName) {
        state.bun = action.payload;
      } else {
        const newIngredient = getNewElementConstructor(state, action.payload);

        state.constructorIngredients.push(newIngredient);
      }
      state.totalSum = calculateTotalPrice(state);
    },
    deleteIngredientFromConstructor(
      state,
      action: PayloadAction<IIngredientsItem>
    ) {
      state.constructorIngredients = state.constructorIngredients.filter(
        (item) => item.sort_id !== action.payload.sort_id
      );
      state.totalSum = calculateTotalPrice(state);
    },
    swapCards(
      state,
      action: PayloadAction<{
        dragId: string;
        hoverId: string;
      }>
    ) {
      const dragCard = state.constructorIngredients.find(
        (item) => item.sort_id === action.payload.dragId
      );
      const dragIndex = state.constructorIngredients.findIndex(
        (item) => item.sort_id === action.payload.dragId
      );
      const hoverIndex = state.constructorIngredients.findIndex(
        (item) => item.sort_id === action.payload.hoverId
      );

      state.constructorIngredients.splice(dragIndex, 1);
      state.constructorIngredients.splice(hoverIndex, 0, dragCard!);
    },
  },
});

export default constructorIngredientsSlice.reducer;

export const {
  setBun,
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  swapCards,
} = constructorIngredientsSlice.actions;
