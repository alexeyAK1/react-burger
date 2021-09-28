import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC } from "react";
import styles from "./price.module.css";

interface IProps {
  price: string;
}

const Price: FC<IProps> = ({ price }) => {
  return (
    <div className={styles.price}>
      <p>
        <span className="text text_type_digits-default">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};

export default Price;
