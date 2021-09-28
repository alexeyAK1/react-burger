import React, { FC } from "react";
import { IIngredientImage } from "../../../models/ingredients";
import OrderByIdIngredient from "./order-by-id-ingredient/order-by-id-ingredient";

interface IProps {
  list: IIngredientImage[];
}

const OrderByIdIngredientsList: FC<IProps> = ({ list }) => {
  return (
    <>
      {list.map((item, index) => (
        <OrderByIdIngredient ingredient={item} key={index} />
      ))}
    </>
  );
};

export default OrderByIdIngredientsList;
