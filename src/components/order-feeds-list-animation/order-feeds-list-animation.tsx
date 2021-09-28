import { motion } from "framer-motion";
import React from "react";
import ScrollContainer from "../../layouts/scroll-container/scroll-container";
import orderData from "../../utils/feed";
import { variantsNextRouter } from "../forms/common/animations-form";
import OrderFeedElementsList from "../order-feed-elements-list/order-feed-elements-list";
import styles from "./order-feeds-list-animation.module.css";

const OrderFeedsListAnimation = () => {
  return (
    <motion.div
      className={styles.motion_container}
      variants={variantsNextRouter}
      initial="hidden"
      exit="exit"
      animate="visible"
    >
      <section className={styles.main_Container}>
        <ScrollContainer style={{ height: "100%" }}>
          <OrderFeedElementsList orderFeedListElement={orderData} />
        </ScrollContainer>
      </section>
    </motion.div>
  );
};

export default OrderFeedsListAnimation;
