import React, { FC, useEffect, useState } from "react";
import ScrollContainer from "../../layouts/scroll-container/scroll-container";
import { IOrderFeedElement } from "../../models/order";
import orderData from "../../utils/feed";
import Loader from "../ui/loader/loader";
import Price from "../ui/price/price";
import OrderByIdIngredientsList from "./order-by-id-ingredients-list/order-by-id-ingredients-list";
import styles from "./order-by-id.module.css";

interface IProps {
  id: string;
}

const OrderById: FC<IProps> = ({ id }) => {
  const [currentOrder, setCurrentOrder] = useState<IOrderFeedElement | null>();
  useEffect(() => {
    const current = orderData.find((item) => item._id === id);

    setCurrentOrder(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main_container}>
      {!currentOrder ? (
        <Loader />
      ) : (
        <div className={styles.flex_container}>
          <div
            className={`text text_type_digits-default ${styles.id}`}
          >{`#${id}`}</div>
          <h2 className="text text_type_main-medium">{currentOrder.name}</h2>
          <p className={styles.status}>
            <span className="text text_type_main-default">
              {currentOrder.status}
            </span>
          </p>
          <h3 className={`text text_type_main-medium ${styles.h3}`}>Состав:</h3>
          <ScrollContainer style={{ height: "312px" }}>
            <OrderByIdIngredientsList list={currentOrder.ingredients} />
          </ScrollContainer>
          <div className={styles.bottom_container}>
            <div className={`text text_type_main-default ${styles.date}`}>
              {currentOrder.data}
            </div>
            <Price price={currentOrder.price.toLocaleString()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderById;
