import { IIngredientsItem } from "./ingredients";

export interface IOrder {
  name: string;
  order: { number: number };
  success: true;
}

export interface IOrderFeedElement {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}
export interface IOrdersFeed {
  orders: IOrderFeedElement[];
  total: number;
  totalToday: number;
}

export interface IOrdersFeedFetch extends IOrdersFeed {
  success: boolean;
}

export interface IOrderFeedElementWithIngredients
  extends Omit<IOrderFeedElement, "ingredients"> {
  ingredients: IIngredientsItem[];
}
export interface IOrdersFeedWithIngredients
  extends Omit<IOrdersFeed, "orders"> {
  orders: IOrderFeedElementWithIngredients[];
}
