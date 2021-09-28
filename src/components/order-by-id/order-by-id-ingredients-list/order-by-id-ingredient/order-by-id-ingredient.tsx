import React, { FC } from "react";
import { IIngredientImage } from "../../../../models/ingredients";
import Price from "../../../ui/price/price";
import RoundPicture from "../../../ui/round-picture/round-picture";
import styles from "./order-by-id-ingredient.module.css";

interface IProps {
  ingredient: IIngredientImage;
}

const OrderByIdIngredient: FC<IProps> = ({ ingredient }) => {
  return (
    <div className={styles.main_container}>
      <RoundPicture image={ingredient} />
      <div className={styles.name}>{ingredient.name}</div>
      <Price price={`${ingredient.count} x ${ingredient.price}`} />
    </div>
  );
};

export default OrderByIdIngredient;
