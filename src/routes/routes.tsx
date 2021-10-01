import React, { useEffect, useMemo } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import ErrorMessage from "../components/common/error-message/error-message";
import DetailsModal from "../components/details-modal/details-modal";
import { useDispatch, useSelector } from "../components/hooks";
import IngredientDetailsById from "../components/ingredient-details-by-id/ingredient-details-by-id";
import OrderById from "../components/order-by-id/order-by-id";
import MainAllLayouts from "../layouts/main-all-layouts/main-all-layouts";
import { ILocationState } from "../models/routes";
import {
  BurgerFactoryPage,
  FeedPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFound404Page,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from "../pages";
import OrderByIdPage from "../pages/order-by-id-page/order-by-id-page";
import { setAppError } from "../services/app-slice";
import {
  FEED_PATH,
  FORGOT_PASSWORD_PATH,
  INGREDIENTS_PATH,
  LOGIN_PATH,
  MAIN_PATH,
  ORDERS_PATH,
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
  const error = useSelector((state) => state.app.error);
  const background = useMemo(
    () => location.state && location.state.background,
    [location.state]
  );

  useEffect(() => {
    dispatch(setAppError(null));
  }, [dispatch, location.pathname]);

  const isPushAction = useMemo(
    () => history.action === "PUSH",
    [history.action]
  );

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
            <Route path={`${FEED_PATH}/:id`}>
              <OrderByIdPage />
            </Route>
            <Route path={FEED_PATH} exact>
              <FeedPage />
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
            <ProtectedRoute path={`${PROFILE_PATH}${ORDERS_PATH}/:id`}>
              <OrderByIdPage />
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
          {background && isPushAction && (
            <>
              <Route
                path={`${PROFILE_PATH}${ORDERS_PATH}/:id`}
                children={
                  <DetailsModal>
                    <OrderById id={""} isShowTitle={false} />
                  </DetailsModal>
                }
              />
              <Route
                path={`${FEED_PATH}/:id`}
                children={
                  <DetailsModal>
                    <OrderById id={""} isShowTitle={false} />
                  </DetailsModal>
                }
              />
              <Route
                path={`${INGREDIENTS_PATH}/:id`}
                children={
                  <DetailsModal title={"Детали ингредиента"}>
                    <IngredientDetailsById id={""} />
                  </DetailsModal>
                }
              />
            </>
          )}
        </>
      )}
    </>
  );
}
