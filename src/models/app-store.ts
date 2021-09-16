import { ICountIngredient, IIngredientsItem } from './ingredients';
import { IOrder } from './order';
import { IUserFields } from './user';

export interface IRootStore {
  app: IAppState;
  ingredients: IIngredientsState;
  currentIngredient: ICurrentIngredientState;
  constructorIngredients: IConstructorIngredientState;
  order: IOrderState;
  user: IUserState;
}
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
  nextIndex: number;
}

export interface IOrderState {
  order: IOrder | null;
  isLoading: boolean;
}
export interface IUserState {
  user: IUserFields;
  isLoading: boolean;
  redirectTo: string;
  errorText: string;
  refreshToken: string;
}
