import React, { FC } from "react";
import { IIngredientsItem } from "../../../../models/ingredients";
import Price from "../../../ui/price/price";
import RoundPicture from "../../../ui/round-picture/round-picture";
import styles from "./order-by-id-ingredient.module.css";

interface IProps {
  ingredient: IIngredientsItem;
  counts: { [key: string]: number };
}

const OrderByIdIngredient: FC<IProps> = ({ ingredient, counts }) => {
  return (
    <div className={styles.main_container}>
      <RoundPicture image={ingredient} />
      <div className={styles.name}>{ingredient.name}</div>
      <Price price={`${counts[ingredient._id]} x ${ingredient.price}`} />
    </div>
  );
};

export default OrderByIdIngredient;
