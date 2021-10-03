import { combineReducers } from "@reduxjs/toolkit";
import { IOrder } from "../../models/order";
import constructorIngredientsReducer, {
    setBun,
    setIngredientsInConstructor
} from "../constructor-ingredients-slice";
import ingredientReducer, { resetCountIngredients } from "../ingredients-slice";
import orderReducer, { setOrder } from "../order-slice";
import { bunIngredient, notBanIngredient } from "./ingredients-slice.spec";

const order: IOrder = {
  success: true,
  name: "Флюоресцентный space бургер",
  order: {
    ingredients: [
      {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
    ],
    _id: "6157f0bb7deb54001ba5f0e7",
    owner: {
      name: "Alexey-1",
      email: "rhbchtf@yandex.ru",
      createdAt: "2021-09-15T12:43:54.838Z",
      updatedAt: "2021-09-30T01:09:52.238Z",
    },
    status: "done",
    name: "Флюоресцентный space бургер",
    createdAt: "2021-10-02T05:40:11.891Z",
    updatedAt: "2021-10-02T05:40:12.022Z",
    number: 4151,
    price: 2056,
  },
};

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
