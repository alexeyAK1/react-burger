import { IIngredientsItem } from "./ingredients";
import { IOwner } from "./user";

export interface IOrder {
  name: string;
  order: IOrderInOrder;
  success: true;
}

interface IOrderInOrder {
  createdAt: string;
  ingredients: IIngredientsItem[];
  name: string;
  number: number;
  owner: IOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
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
