import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  BurgerFactoryPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../pages";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <BurgerFactoryPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientPage />
        </Route>
      </Switch>
    </Router>
  );
}
