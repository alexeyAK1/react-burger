import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  IConstructorIngredientState,
  IIngredientsState,
} from "../models/app-store";
import { ICountIngredient, IIngredientsItem } from "../models/ingredients";
import { setAppError } from "./app-slice";

export const calculateTotalPrice = (state: IConstructorIngredientState) => {
  const totalAddition = state.constructorIngredients.reduce(
    (accumulator, item) => {
      return accumulator + item.price;
    },
    0
  );
  const totalBun = state.bun ? state.bun.price * 2 : 0;

  return totalAddition + totalBun;
};

export const addOrDeleteCountIngredients = (
  state: IIngredientsState,
  type: "add" | "delete",
  idIngredient: string
) => {
  let newCountIngredients: ICountIngredient[] = [];

  const index = state.countIngredients.findIndex(
    (el) => el.id === idIngredient
  );

  const addCount = (item: ICountIngredient) =>
    item.id === idIngredient ? { ...item, count: item.count + 1 } : item;

  const deleteCount = (item: ICountIngredient) =>
    item.id === idIngredient ? { ...item, count: item.count - 1 } : item;

  if (type === "add") {
    if (index !== -1) {
      newCountIngredients = state.countIngredients.map(addCount);
    } else {
      newCountIngredients = [
        ...state.countIngredients,
        { id: idIngredient, count: 1 },
      ];
    }
  } else {
    if (state.countIngredients[index].count > 1) {
      newCountIngredients = state.countIngredients.map(deleteCount);
    } else {
      newCountIngredients = state.countIngredients.filter(
        (item) => item.id !== idIngredient
      );
    }
  }

  return newCountIngredients;
};

export const getNewElementConstructor = (
  state: IConstructorIngredientState,
  addedIngredient: IIngredientsItem
) => {
  return {
    ...addedIngredient,
    sort_id: `${state.nextIndex}`,
  };
};

export const setErrorInAsyncThunk = (
  error: Error,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  rejectWithValue: (value: unknown) => any
) => {
  const sendError = {
    name: (error as Error).name,
    message: (error as Error).message,
  };
  rejectWithValue(error);
  dispatch(setAppError(sendError));
};
