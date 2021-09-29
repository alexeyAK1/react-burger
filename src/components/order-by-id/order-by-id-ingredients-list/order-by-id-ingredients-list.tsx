import React, { FC, useEffect, useState } from "react";
import { IIngredientsItem } from "../../../models/ingredients";
import Loader from "../../ui/loader/loader";
import OrderByIdIngredient from "./order-by-id-ingredient/order-by-id-ingredient";

interface IProps {
  list: IIngredientsItem[];
}

const OrderByIdIngredientsList: FC<IProps> = ({ list }) => {
  const [counts, setCounts] = useState<{ [key: string]: number } | null>(null);
  const [filteredList, setFilteredList] = useState<IIngredientsItem[]>([]);

  useEffect(() => {
    const filteredListLocal: IIngredientsItem[] = [];
    const countsLocal = list.reduce<{ [key: string]: number }>(
      (returnCountObj, ingredient): { [key: string]: number } => {
        if (returnCountObj[ingredient._id]) {
          returnCountObj[ingredient._id] = returnCountObj[ingredient._id] + 1;
        } else {
          filteredListLocal.push({ ...ingredient });
          returnCountObj[ingredient._id] = 1;
        }

        return returnCountObj;
      },
      {}
    );

    setFilteredList([...filteredListLocal]);
    setCounts({ ...countsLocal });
  }, [list]);

  return (
    <>
      {counts && filteredList.length > 0 ? (
        filteredList.map((item, index) => (
          <OrderByIdIngredient ingredient={item} key={index} counts={counts} />
        ))
      ) : (
        <Loader />
      )}
    </>
  );
};

export default OrderByIdIngredientsList;
