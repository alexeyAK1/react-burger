import React from "react";
import ScrollContainer from "../../layouts/scroll-container/scroll-container";
import TwoColumns from "../../layouts/two-columns/two-columns";
import orderData from "../../utils/feed";
import OrderFeedElementsList from "../order-feed-elements-list/order-feed-elements-list";
import styles from "./order-feed.module.css";
import Statistics from "./statistics/statistics";

export default function OrderFeed() {
  const title = "Лента заказов";
  const ready = ["034533", "034532", "034530", "034527", "034525"];
  const inTheWork = ["034538", "034541", "034542"];

  const completedForAllTime = 28752;
  const completedToday = 138;

  return (
    <div className={styles.main_container}>
      <h1>{title}</h1>
      <TwoColumns style={{ height: "100%" }} className={styles.gap60}>
        <>
          <section>
            <ScrollContainer style={{ height: "100%" }}>
              <OrderFeedElementsList orderFeedListElement={orderData} />
            </ScrollContainer>
          </section>
          <Statistics
            ready={ready}
            inTheWork={inTheWork}
            completedForAllTime={completedForAllTime}
            completedToday={completedToday}
          />
        </>
      </TwoColumns>
    </div>
  );
}
