
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollContainer from "../../layouts/scroll-container/scroll-container";
import TwoColumns from "../../layouts/two-columns/two-columns";
import { IOrderFeedElementWithIngredients } from "../../models/order";
import {
  wsOrderAllClose,
  wsOrderAllConnectionStart
} from "../../redux/action-types/ws-action-creators";
import { TRootState } from "../../services/store";
import OrderFeedElementsList from "../order-feed-elements-list/order-feed-elements-list";
import Loader from "../ui/loader/loader";
import styles from "./order-feed.module.css";
import Statistics from "./statistics/statistics";

export default function OrderFeed() {
  const dispatch = useDispatch();
  const title = "Лента заказов";
  const [orderData, setOrderData] = useState<
    IOrderFeedElementWithIngredients[]
  >([]);
  const [completedForAllTime, setCompletedForAllTime] = useState(0);
  const [completedToday, setCompletedToday] = useState(0);
  const [readyOrders, setReadyOrders] = useState<string[]>([]);
  const [inTheWorkOrders, setInTheWorkOrders] = useState<string[]>([]);

  const orderFeedAll = useSelector(
    (state: TRootState) => state.order.orderFeedAll
  );

  useEffect(() => {
    dispatch(wsOrderAllConnectionStart());

    return () => {
      dispatch(wsOrderAllClose());
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orderFeedAll) {
      setOrderData(orderFeedAll.orders);
      setCompletedForAllTime(orderFeedAll.total);
      setCompletedToday(orderFeedAll.totalToday);

      const ready: string[] = [];
      const inTheWork: string[] = [];

      orderFeedAll.orders.forEach((orderItem) => {
        if (orderItem.status === "done") {
          ready.push(`${orderItem.number}`);
        } else {
          inTheWork.push(`${orderItem.number}`);
        }

        setReadyOrders([...ready]);
        setInTheWorkOrders([...inTheWork]);
      });
    }
  }, [orderFeedAll]);

  return (
    <div className={styles.main_container}>
      <h1>{title}</h1>
      {orderData.length > 0 ? (
        <TwoColumns style={{ height: "100%" }} className={styles.gap60}>
          <>
            <section>
              <ScrollContainer style={{ height: "100%" }}>
                <OrderFeedElementsList orderFeedListElement={orderData} />
              </ScrollContainer>
            </section>
            <Statistics
              ready={readyOrders}
              inTheWork={inTheWorkOrders}
              completedForAllTime={completedForAllTime}
              completedToday={completedToday}
            />
          </>
        </TwoColumns>
      ) : (
        <Loader />
      )}
    </div>
  );
}
