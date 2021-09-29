import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "../redux/middleware/socket-middleware";
import appReducer from "./app-slice";
import constructorIngredientsReducer from "./constructor-ingredients-slice";
import currentIngredientReducer from "./current-ingredient-slice";
import ingredientReducer from "./ingredients-slice";
import orderReducer from "./order-slice";
import userReducer from "./user-slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    ingredients: ingredientReducer,
    currentIngredient: currentIngredientReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .prepend(socketMiddleware())
      .concat(),
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
