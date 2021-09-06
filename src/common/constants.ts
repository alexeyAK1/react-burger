export const MAIN_URL = 'https://norma.nomoreparties.space/api';

export const bunName = 'bun';

export const categories = { bun: 'Булки', sauce: 'Соусы', main: 'Начинки' };

export const categoriesTypeArray = Object.keys(categories) as Array<
  keyof typeof categories
>;
