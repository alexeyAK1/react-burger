import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app-slice';
import ingredientReducer from './ingredients-slice';
import currentIngredientReducer from './current-ingredient-slice';
import constructorIngredientsReducer from './constructor-ingredients-slice';
import orderReducer from './order-slice';

const store = configureStore({
  reducer: {
    app: appReducer,
    ingredients: ingredientReducer,
    currentIngredient: currentIngredientReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
