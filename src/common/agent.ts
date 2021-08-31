import { IIngredientsItem } from "../models/ingredients1";
import { MAIN_URL } from "./constants";
import { IOrder } from '../models/order1';

export const getIngredientData = async () => {
    const res = await fetch(MAIN_URL + '/ingredients');
    const fetchData = await res.json();

    return(fetchData.data as IIngredientsItem[]);
};

export const getOrderData = async (ingredients: string[]) => {
    const res = await fetch(MAIN_URL + '/orders', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify({ ingredients })
  });
  const fetchData = await res.json();

  return(fetchData as IOrder);
};