import React from "react";
import { Switch, Route } from "react-router-dom";

import {
  BurgerFactoryPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from "../pages";

export default function Routes() {
  return (
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
        <Route>
          <NotFound404Page />
        </Route>
      </Switch>
  );
}
