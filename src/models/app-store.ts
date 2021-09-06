import { ICountIngredient, IIngredientsItem } from './ingredients';
import { IOrder } from './order';

export interface IAppState {
  isLoading: boolean;
  error: Error | null;
}

export interface IIngredientsState {
  ingredients: IIngredientsItem[];
  countIngredients: ICountIngredient[];
  isLoading: boolean;
}

export interface ICurrentIngredientState {
  currentIngredient: IIngredientsItem | null;
}

export interface IConstructorIngredientState {
  bun: IIngredientsItem | null;
  constructorIngredients: IIngredientsItem[];
  totalSum: number;
}

export interface IOrderState {
  order: IOrder | null;
}
