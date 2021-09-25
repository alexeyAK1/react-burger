import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import ErrorMessage from "../components/common/error-message/error-message";
import IngredientDetailsModal from "../components/ingredient-details-modal/ingredient-details-modal";
import MainAllLayouts from "../layouts/main-all-layouts/main-all-layouts";
import { ILocationState } from "../models/routes";
import {
  BurgerFactoryPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
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
  RESET_PASSWORD_PATH
} from "./constants-path";
import ProtectedFromAuthorizedRoute from "./protected-from-authorized-route/protected-from-authorized-route";
import ProtectedRoute from "./protected-route/protected-route";

export default function Routes() {
  const location = useLocation<ILocationState>();
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.app.error);
  const background = useMemo(
    () => location.state && location.state.background,
    [location.state]
  );

  useEffect(() => {
    dispatch(setAppError(null));
  }, [dispatch, location.pathname]);

  const isPushAction = useMemo(() => history.action === "PUSH", [history.action]);

  const isModalIngredientBackgroundLocation = useMemo(
    () => (isPushAction && background ? background : location),
    [background, isPushAction, location]
  );
  return (
    <>
      {error ? (
        <MainAllLayouts>
          <ErrorMessage error={error} />
        </MainAllLayouts>
      ) : (
        <>
          <Switch location={isModalIngredientBackgroundLocation}>
            <Route path={MAIN_PATH} exact>
              <BurgerFactoryPage />
            </Route>
            <ProtectedFromAuthorizedRoute path={LOGIN_PATH}>
              <LoginPage />
            </ProtectedFromAuthorizedRoute>
            <ProtectedFromAuthorizedRoute path={REGISTER_PATH}>
              <RegisterPage />
            </ProtectedFromAuthorizedRoute>
            <ProtectedFromAuthorizedRoute path={FORGOT_PASSWORD_PATH}>
              <ForgotPasswordPage />
            </ProtectedFromAuthorizedRoute>
            <ProtectedFromAuthorizedRoute path={RESET_PASSWORD_PATH}>
              <ResetPasswordPage />
            </ProtectedFromAuthorizedRoute>
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
          {background && isPushAction && (
            <Route
              path={`${INGREDIENTS_PATH}/:id`}
              children={<IngredientDetailsModal />}
            />
          )}
        </>
      )}
    </>
  );
}
