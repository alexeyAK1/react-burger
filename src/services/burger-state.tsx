import React, { useCallback, useEffect, useReducer } from 'react';
import { reducer } from './burger-reducer';
import { ICountIngredient, IIngredientsItem } from '../models/ingredients';
import { IOrder } from '../models/order';
import { BurgerContext } from './burger-context';
import {
  SET_BUN,
  SET_CONSTRUCTOR_INGREDIENTS,
  SET_INGREDIENTS,
  SET_ORDER,
  UPDATE_CONSTRUCTOR_INGREDIENT,
} from './burger-types';
import bun from '../utils/bun';
import ingredients from '../utils/ingredients';
import { getIngredientData, getOrderData } from '../common/agent';

export interface IBurgerState {
  bun: IIngredientsItem | null;
  ingredients: IIngredientsItem[];
  constructorIngredients: IIngredientsItem[];
  order: IOrder | null;
  totalSum: number;
  countIngredients: ICountIngredient[];
  setOrder: (
    callback?: (() => void) | undefined,
    errorFunction?: (() => void) | undefined
  ) => Promise<void>;
  setIngredients: (
    callback?: (() => void) | undefined,
    errorFunction?: (() => void) | undefined
  ) => Promise<void>;
  setBun: (bunData: IIngredientsItem) => void;
  addIngredientToConstructor: (ingredient: IIngredientsItem) => void;
  deleteIngredientToConstructor: (ingredient: IIngredientsItem) => void;
}

interface IProps {
  children: React.ReactChild;
}

export const BurgerState = ({ children }: IProps) => {
  // const getIngredientIds = () => state.ingredients.map((item) => item._id);
  // const getNElementArr = (n:number, element?: string) => new Array(n).fill(element);

  useEffect(() => {
    dispatch({ type: SET_BUN, payload: bun as IIngredientsItem });
    dispatch({
      type: SET_CONSTRUCTOR_INGREDIENTS,
      payload: ingredients as IIngredientsItem[],
    });
  }, []);

  const setOrder = useCallback(
    async (callback?: () => void, errorFunction?: () => void) => {
      // const ingredients = [...getIngredientIds(), ...getNElementArr(2, state.bun?._id)]
      const ingredients = [
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c9',
      ];
      // const ingredients = ["60666c42cc7b410027a1a9b5", "60666c42cc7b410027a1a9b6", "60666c42cc7b410027a1a9b7", "60666c42cc7b410027a1a9b4", "60666c42cc7b410027a1a9c1", "60666c42cc7b410027a1a9c2", "60666c42cc7b410027a1a9c3", "60666c42cc7b410027a1a9c4cs"];
      try {
        const orderData = await getOrderData(ingredients);

        dispatch({ type: SET_ORDER, payload: orderData });
        if (callback) {
          callback();
        }
      } catch (error) {
        if (errorFunction) {
          errorFunction();
        }
      }
    },
    []
  );

  const setBun = (bunData: IIngredientsItem) => {
    dispatch({ type: SET_BUN, payload: bunData });
  };

  const setIngredients = async (
    callback?: () => void,
    errorFunction?: () => void
  ) => {
    try {
      const ingredientsData = await getIngredientData();

      dispatch({
        type: SET_INGREDIENTS,
        payload: ingredientsData as IIngredientsItem[],
      });

      if (callback) {
        callback();
      }
    } catch (error) {
      if (errorFunction) {
        errorFunction();
      }
    }
  };

  const updateTotalSum = () =>
    (state.totalSum + (state && state.bun ? state.bun.price : 0) * 100 * 2) /
    100;

  const addIngredientToConstructor = (ingredient: IIngredientsItem) => {
    dispatch({
      type: UPDATE_CONSTRUCTOR_INGREDIENT,
      payload: { effect: 'add', ingredient },
    });
  };

  const deleteIngredientToConstructor = (ingredient: IIngredientsItem) => {
    dispatch({
      type: UPDATE_CONSTRUCTOR_INGREDIENT,
      payload: { effect: 'delete', ingredient },
    });
  };

  const initialState: IBurgerState = {
    bun: null,
    ingredients: [],
    constructorIngredients: [],
    order: null,
    totalSum: 0,
    countIngredients: [],
    setOrder,
    setIngredients,
    setBun,
    addIngredientToConstructor,
    deleteIngredientToConstructor,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BurgerContext.Provider
      value={{
        ...state,
        totalSum: updateTotalSum(),
        setOrder,
        setIngredients,
        setBun,
        addIngredientToConstructor,
        deleteIngredientToConstructor,
      }}
    >
      {children}
    </BurgerContext.Provider>
  );
};
