import { IIngredientImage } from "./ingredients";

export interface IOrder {
  name: string;
  order: { number: number };
  success: true;
}

export interface IOrderFeedElement {
  _id: string;
  name: string;
  data: string;
  price: number;
  status: string;
  ingredients: IIngredientImage[];
  __v: number;
}
