import { AnimatePresence } from "framer-motion";
import React from "react";
import { Switch, useLocation, useRouteMatch } from "react-router";
import { Route } from "react-router-dom";
import { ProfileForm } from "../components/forms";
import OrderFeedsListAnimation from "../components/order-feeds-list-animation/order-feeds-list-animation";
import { ORDERS_PATH } from "./constants-path";

export default function ProfilePageRoutes() {
  const location = useLocation();
  const { path } = useRouteMatch();

  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.key}>
        <Route exact path={path}>
          <ProfileForm />
        </Route>
        <Route path={`${path}${ORDERS_PATH}`}>
          <OrderFeedsListAnimation />
        </Route>
      </Switch>
    </AnimatePresence>
  );
}
