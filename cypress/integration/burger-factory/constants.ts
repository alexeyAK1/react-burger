import { getNIndexChildrenSelector } from "../common/functions";

export const bunsContainer = "[name^=bun]";
export const saucesContainer = "[name^=sauce]";
export const mainsContainer = "[name^=main]";
export const ingredientsContainer =
  "[class^=ingredients-list_category_ingredients_container]";

export const bunElementSelector = getNIndexChildrenSelector(
  `${bunsContainer} > ${ingredientsContainer}`,
  1
);
export const sauceElementSelector = getNIndexChildrenSelector(
  `${saucesContainer} > ${ingredientsContainer}`,
  1
);
export const mainElementSelector = getNIndexChildrenSelector(
  `${mainsContainer} > ${ingredientsContainer}`,
  1
);

export const constructorContainer =
  "[class^=burger-constructor_burger_constructor_body]";
export const constructorBunTop = getNIndexChildrenSelector(
  `${constructorContainer}`,
  1
);
export const constructorBunButton = getNIndexChildrenSelector(
  `${constructorContainer}`,
  3
);
export const dropContainer =
  "[class^=burger-constructor_burger_list_container] > [class^=scroll-container_scroll_container] > [class^=scroll-container_scroll_container_inner]";
export const countElements =
  "[class*=ingredient-card_ingredient_count] > [class*=counter_counter] > p";
export const coastTotal =
  "[class*=order_burger_constructor_footer] > [class*=order_total_container] > [class*=text_type_digits-medium]";
// const sendButtonSelector = "[class^=button_button]";
