export const bunName = "bun";
export const reEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

export const categories = { bun: "Булки", sauce: "Соусы", main: "Начинки" };

export const categoriesTypeArray = Object.keys(categories) as Array<
  keyof typeof categories
>;
