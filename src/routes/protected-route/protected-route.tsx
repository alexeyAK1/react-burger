import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../../services/store";
import { LOGIN_PATH, MAIN_PATH } from "../constants-path";

interface IProps extends RouteProps {
  children: React.ReactChild;
  redirectTo?: string;
  protectionFromAuthorized?: boolean;
}

export default function ProtectedRoute({
  children,
  protectionFromAuthorized = false,
  redirectTo = LOGIN_PATH,
  ...rest
}: IProps) {
  const refreshToken = useSelector(
    (state: RootState) => state.user.refreshToken
  );
  const [isUserAuthorized, setIsUserAuthorized] = useState(!!refreshToken);

  useEffect(() => {
    setIsUserAuthorized(!!refreshToken);
  }, [refreshToken]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        const localState =
          (location as { state: { from: string } }).state || {};

        return protectionFromAuthorized !== isUserAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: protectionFromAuthorized
                ? ((location as { state: { from: string } }).state &&
                    (location as { state: { from: string } }).state.from) ||
                  MAIN_PATH
                : redirectTo,
              state: { ...localState, from: location.pathname },
            }}
          />
        );
      }}
    />
  );
}
