import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScrollContainer from "../../layouts/scroll-container/scroll-container";
import { IOrderFeedElementWithIngredients } from "../../models/order";
import {
  wsOrderClose,
  wsOrderConnectionStart
} from "../../redux/action-types/wsActionCreators";
import { RootState } from "../../services/store";
import { variantsNextRouter } from "../forms/common/animations-form";
import OrderFeedElementsList from "../order-feed-elements-list/order-feed-elements-list";
import Loader from "../ui/loader/loader";
import styles from "./order-feeds-list-animation.module.css";

const OrderFeedsListAnimation = () => {
  const [orderData, setOrderData] = useState<
    IOrderFeedElementWithIngredients[]
  >([]);
  const orderFeed = useSelector((state: RootState) => state.order.orderFeed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsOrderConnectionStart());

    return () => {
      dispatch(wsOrderClose());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (orderFeed) {
      setOrderData(orderFeed.orders);
    }
  }, [orderFeed]);

  return orderData.length > 0 ? (
    <motion.div
      className={styles.motion_container}
      variants={variantsNextRouter}
      initial="hidden"
      exit="exit"
      animate="visible"
    >
      <section className={styles.main_Container}>
        <ScrollContainer style={{ height: "100%" }}>
          <OrderFeedElementsList
            orderFeedListElement={orderData}
            showStatus={true}
          />
        </ScrollContainer>
      </section>
    </motion.div>
  ) : (
    <Loader />
  );
};

export default OrderFeedsListAnimation;
