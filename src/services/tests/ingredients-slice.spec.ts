import { IIngredientsItem } from "../../models/ingredients";
import constructorIngredientsReducer, {
  addIngredientInConstructor,
  deleteIngredientFromConstructor,
  setBun
} from "../constructor-ingredients-slice";
import ingredientReducer from "../ingredients-slice";
// import fetchMock from "fetch-mock";

export const bunIngredient: IIngredientsItem = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  name: "Краторная булка N-200i",
  price: 1255,
  proteins: 80,
  type: "bun",
  __v: 0,
  _id: "60d3b41abdacab0026a733c6",
};
export const notBanIngredient: IIngredientsItem = {
  calories: 643,
  carbohydrates: 85,
  fat: 26,
  image: "https://code.s3.yandex.net/react/code/meat-03.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
  name: "Филе Люминесцентного тетраодонтимформа",
  price: 988,
  proteins: 44,
  type: "main",
  __v: 0,
  _id: "60d3b41abdacab0026a733c8",
};

describe("constructor-ingredients-slice", () => {
  describe("addIngredientInConstructor", () => {
    it("set initial state", () => {
      const state = constructorIngredientsReducer(
        undefined,
        //@ts-ignore
        {}
      );
      expect(state.bun).toBeNull();
      expect(state.constructorIngredients).toEqual([]);
      expect(state.totalSum).toBe(0);
      expect(state.nextIndex).toBe(0);
    });

    it("sets addIngredient In Constructor 'bun'", () => {
      let state = constructorIngredientsReducer(
        undefined,
        addIngredientInConstructor({ ...bunIngredient })
      );
      expect(state.bun).toEqual({ ...bunIngredient });
      expect(state.totalSum).toBe(1255 * 2);
      state = constructorIngredientsReducer(undefined, setBun(null));
      expect(state.bun).toBeNull();
      expect(state.totalSum).toBe(0);
    });

    it("sets count addIngredient 'bun'", () => {
      const state = ingredientReducer(
        {
          ingredients: [{ ...notBanIngredient }],
          countIngredients: [],
          isLoading: false,
        },
        addIngredientInConstructor({ ...notBanIngredient })
      );
      expect(state.countIngredients).toEqual([
        { id: notBanIngredient._id, count: 1 },
      ]);
    });

    it("sets addIngredient In Constructor not 'bun'", () => {
      const state = constructorIngredientsReducer(
        undefined,
        addIngredientInConstructor({ ...notBanIngredient })
      );
      const unchangedIngredient = state.constructorIngredients.find(
        (ingredient) => ingredient._id === notBanIngredient._id
      );
      expect(unchangedIngredient).toEqual({
        ...notBanIngredient,
        sort_id: "0",
      });
      expect(state.totalSum).toBe(988);
      expect(state.nextIndex).toBe(1);
    });

    it("sets delete Ingredient In Constructor not 'bun'", () => {
      let state = constructorIngredientsReducer(
        {
          bun: null,
          constructorIngredients: [{ ...notBanIngredient }],
          totalSum: notBanIngredient.price,
          nextIndex: 1,
        },
        deleteIngredientFromConstructor({ ...notBanIngredient })
      );
      expect(state).toEqual({
        bun: null,
        constructorIngredients: [],
        totalSum: 0,
        nextIndex: 1,
      });
      state = constructorIngredientsReducer(
        state,
        deleteIngredientFromConstructor({ ...notBanIngredient })
      );
      expect(state).toEqual({
        bun: null,
        constructorIngredients: [],
        totalSum: 0,
        nextIndex: 1,
      });
    });
  });
});
