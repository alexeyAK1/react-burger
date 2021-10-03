import { combineReducers } from "@reduxjs/toolkit";
import constructorIngredientsReducer, {
  setBun,
  setIngredientsInConstructor
} from "../constructor-ingredients-slice";
import ingredientReducer, { resetCountIngredients } from "../ingredients-slice";
import orderReducer, { setOrder } from "../order-slice";
import { bunIngredient, notBanIngredient, order } from "./test-data";

describe("order-slice", () => {
  describe("order/getOrderFetch", () => {
    const reducer = combineReducers({
      ingredients: ingredientReducer,
      constructorIngredients: constructorIngredientsReducer,
      order: orderReducer,
    });

    const initialState = {
      ingredients: {
        ingredients: [],
        countIngredients: [{ id: notBanIngredient._id, count: 1 }],
        isLoading: false,
      },
      constructorIngredients: {
        bun: { ...bunIngredient },
        constructorIngredients: [{ ...notBanIngredient }],
        totalSum: 0,
        nextIndex: 0,
      },
      order: {
        order: null,
        isLoading: false,
        orderFeed: null,
        orderFeedAll: null,
      },
    };

    it("set getOrderFetch cleared", () => {
      let state = reducer(initialState, setOrder({ ...order }));
      expect(state.order.order).toEqual({ ...order });
      state = reducer(state, setBun(null));
      expect(state.constructorIngredients.bun).toBeNull();
      state = reducer(state, setIngredientsInConstructor([]));
      expect(state.constructorIngredients.constructorIngredients).toEqual([]);
      state = reducer(state, resetCountIngredients([]));
      expect(state.ingredients.countIngredients).toEqual([]);
    });
  });
});
