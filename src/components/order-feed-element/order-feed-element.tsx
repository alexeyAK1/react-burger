import React, { FC, useEffect, useState } from "react";
import { getFormattedDateWithTime } from "../../common/functions";
import { IOrderFeedElementWithIngredients } from "../../models/order";
import Price from "../ui/price/price";
import RowRoundPictures from "../ui/row-round-pictures/row-round-pictures";
import styles from "./order-feed-element.module.css";

interface IProps {
  orderElement: IOrderFeedElementWithIngredients;
  showStatus?: boolean;
  OnClick?: (idFeed: string) => void;
}

const OrderFeedElement: FC<IProps> = ({
  orderElement: { createdAt, ingredients, name, number, status },
  showStatus = false,
  OnClick,
}) => {
  const handleOnClick = OnClick ? () => OnClick(`${number}`) : undefined;
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const total = ingredients.reduce(
      (calcTotal, { price }) => (calcTotal = calcTotal + +price),
      0
    );

    setPrice(total);
  }, [ingredients]);

  return (
    <div className={styles.main_container} onClick={handleOnClick}>
      <div className={styles.top_container}>
        <div
          className={`text text_type_digits-default ${styles.id}`}
        >{`#${number}`}</div>
        <div className={`text text_type_main-default ${styles.data}`}>
          {getFormattedDateWithTime(createdAt)}
        </div>
      </div>
      <div className={`text text_type_main-medium ${styles.name_container}`}>
        {name}
      </div>
      {showStatus ? (
        <div
          className={`text text_type_main-default ${
            status === "done"
              ? styles.done_status
              : status === "cancelled"
              ? styles.canceled_status
              : styles.prepared_status
          }`}
        >
          {status === "done"
            ? "Выполнен"
            : status === "cancelled"
            ? "Отменен"
            : "Готовиться"}
        </div>
      ) : null}
      <div className={styles.bottom_container}>
        <div className={styles.images_container}>
          <RowRoundPictures images={ingredients} />
        </div>
        <Price price={price.toLocaleString()} />
      </div>
    </div>
  );
};

export default OrderFeedElement;
