import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormattedDateWithTime } from "../../common/functions";
import ScrollContainer from "../../layouts/scroll-container/scroll-container";
import { IOrderFeedElementWithIngredients } from "../../models/order";
import {
  wsOrderAllClose,
  wsOrderAllConnectionStart,
  wsOrderClose,
  wsOrderConnectionStart
} from "../../redux/action-types/wsActionCreators";
import { RootState } from "../../services/store";
import Loader from "../ui/loader/loader";
import Price from "../ui/price/price";
import OrderByIdIngredientsList from "./order-by-id-ingredients-list/order-by-id-ingredients-list";
import styles from "./order-by-id.module.css";

interface IProps {
  id: string;
  isShowTitle?: boolean;
}

const OrderById: FC<IProps> = ({ id, isShowTitle = true }) => {
  const dispatch = useDispatch();
  const [currentOrder, setCurrentOrder] =
    useState<IOrderFeedElementWithIngredients | null>(null);
  const [price, setPrice] = useState(0);
  const orderFeedAll = useSelector(
    (state: RootState) => state.order.orderFeedAll
  );
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const orderFeed = useSelector((state: RootState) => state.order.orderFeed);

  useEffect(() => {
    if (orderFeedAll && ingredients) {
      const currentOrderLocal = orderFeedAll.orders.find(
        (orderItem) => orderItem.number === +id
      );

      if (currentOrderLocal) {
        setCurrentOrder(currentOrderLocal);
      }
    } else {
      dispatch(wsOrderAllConnectionStart());
    }
    return () => {
      dispatch(wsOrderAllClose());
    };
  }, [dispatch, id, orderFeedAll, ingredients]);

  useEffect(() => {
    if (orderFeed && ingredients) {
      const currentOrderLocal = orderFeed.orders.find(
        (orderItem) => orderItem.number === +id
      );

      if (currentOrderLocal) {
        setCurrentOrder(currentOrderLocal);
      }
    } else {
      dispatch(wsOrderConnectionStart());
    }
    return () => {
      dispatch(wsOrderClose());
    };
  }, [dispatch, id, orderFeed, ingredients]);

  useEffect(() => {
    if (currentOrder) {
      const total = currentOrder.ingredients.reduce(
        (calcTotal, { price }) => (calcTotal = calcTotal + +price),
        0
      );

      setPrice(total);
    }
  }, [currentOrder]);

  return (
    <div className={styles.main_container}>
      {!currentOrder ? (
        <Loader />
      ) : (
        <div
          className={`${styles.flex_container} ${
            isShowTitle
              ? styles.flex_container_pt
              : styles.flex_container_pt_min
          }`}
        >
          {isShowTitle ? (
            <div
              className={`text text_type_digits-default ${styles.id}`}
            >{`#${id}`}</div>
          ) : null}
          <h2 className="text text_type_main-medium">{currentOrder.name}</h2>
          <p
            className={`${styles.status} ${
              currentOrder.status === "done"
                ? styles.done_status
                : currentOrder.status === "cancelled"
                ? styles.canceled_status
                : styles.prepared_status
            }`}
          >
            <span className="text text_type_main-default">
              {currentOrder.status === "done"
                ? "Выполнен"
                : currentOrder.status === "cancelled"
                ? "Отменен"
                : "Готовиться"}
            </span>
          </p>
          <h3 className={`text text_type_main-medium ${styles.h3}`}>Состав:</h3>
          <ScrollContainer style={{ height: "312px" }}>
            <OrderByIdIngredientsList list={currentOrder.ingredients} />
          </ScrollContainer>
          <div className={styles.bottom_container}>
            <div className={`text text_type_main-default ${styles.date}`}>
              {getFormattedDateWithTime(currentOrder.createdAt)}
            </div>
            <Price price={price.toLocaleString()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderById;
