import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import ErrorMessage from "../components/common/error-message/error-message";
import MainAllLayouts from "../layouts/main-all-layouts/main-all-layouts";

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
import { setAppError } from "../services/app-slice";
import { RootState } from "../services/store";
import {
  FORGOT_PASSWORD_PATH,
  INGREDIENTS_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
} from "./constants-path";
import ProtectedRoute from "./protected-route/protected-route";

export default function Routes() {
  const location = useLocation();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.app.error);

  useEffect(() => {
    dispatch(setAppError(null));
  }, [dispatch, location.pathname]);

  return (
    <>
      {error ? (
        <MainAllLayouts>
          <ErrorMessage error={error} />
        </MainAllLayouts>
      ) : (
        <Switch>
          <Route path={MAIN_PATH} exact>
            <BurgerFactoryPage />
          </Route>
          <ProtectedRoute
            protectionFromAuthorized={true}
            redirectTo={MAIN_PATH}
            path={LOGIN_PATH}
          >
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute
            protectionFromAuthorized={true}
            redirectTo={MAIN_PATH}
            path={REGISTER_PATH}
          >
            <RegisterPage />
          </ProtectedRoute>
          <ProtectedRoute
            protectionFromAuthorized={true}
            redirectTo={MAIN_PATH}
            path={FORGOT_PASSWORD_PATH}
          >
            <ForgotPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute
            protectionFromAuthorized={true}
            redirectTo={MAIN_PATH}
            path={RESET_PASSWORD_PATH}
          >
            <ResetPasswordPage />
          </ProtectedRoute>
          <ProtectedRoute path={PROFILE_PATH}>
            <ProfilePage />
          </ProtectedRoute>
          <Route path={`${INGREDIENTS_PATH}/:id`}>
            <IngredientPage />
          </Route>
          <Route path={INGREDIENTS_PATH} exact>
            <BurgerFactoryPage />
          </Route>
          <Route>
            <NotFound404Page />
          </Route>
        </Switch>
      )}
    </>
  );
}
