import { IIngredientsItem } from '../models/ingredients';
import { MAIN_URL } from '../common/constants';
import { IOrder } from '../models/order';

export const getIngredientData = async () => {
  const res = await fetch(MAIN_URL + '/ingredients');

  if (res.status === 200) {
    const fetchData = await res.json();

    return fetchData.data as IIngredientsItem[];
  }

  throw new Error('' + res.status);
};

export const getOrderData = async (ingredients: string[]) => {
  const res = await fetch(MAIN_URL + '/orders', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });

  if (res.status === 200) {
    const fetchData = await res.json();

    return fetchData as IOrder;
  }

  throw new Error('' + res.status);
};
