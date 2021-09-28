import React, { FC } from "react";
import { IOrderFeedElement } from "../../models/order";
import Price from "../ui/price/price";
import RowRoundPictures from "../ui/row-round-pictures/row-round-pictures";
import styles from "./order-feed-element.module.css";

interface IProps {
  orderElement: IOrderFeedElement;
  OnClick?: (idFeed: string) => void;
}

const OrderFeedElement: FC<IProps> = ({
  orderElement: { _id, data, ingredients, name, price },
  OnClick,
}) => {
  const handleOnClick = OnClick ? () => OnClick(_id) : undefined;

  return (
    <div className={styles.main_container} onClick={handleOnClick}>
      <div className={styles.top_container}>
        <div
          className={`text text_type_digits-default ${styles.id}`}
        >{`#${_id}`}</div>
        <div className={`text text_type_main-default ${styles.data}`}>
          {data}
        </div>
      </div>
      <div className={`text text_type_main-medium ${styles.name_container}`}>
        {name}
      </div>
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
