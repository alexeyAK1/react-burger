import { ICountIngredient, IIngredientsItem } from "./ingredients";
import { IOrder, IOrdersFeedWithIngredients } from "./order";
import { IUserFields } from "./user";
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
  orderFeed: IOrdersFeedWithIngredients | null;
  orderFeedAll: IOrdersFeedWithIngredients | null;
}
export interface IUserState {
  user: IUserFields;
  isLoading: boolean;
  redirectTo: string;
  errorText: string;
  refreshToken: string;
}
