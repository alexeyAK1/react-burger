export type TCategory = 'bun' | 'sauce' | 'main';

export interface IIngredientsItem {
  _id: string;
  name: string;
  type: TCategory;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}