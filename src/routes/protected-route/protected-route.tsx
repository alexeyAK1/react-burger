import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { TRootState } from "../../services/store";
import { LOGIN_PATH } from "../constants-path";

interface IProps extends RouteProps {
  children: React.ReactChild;
  redirectTo?: string;
  protectionFromAuthorized?: boolean;
}

interface ILocalState {
  state: { from: string };
}

export default function ProtectedRoute({
  children,
  redirectTo = LOGIN_PATH,
  ...rest
}: IProps) {
  const refreshToken = useSelector(
    (state: TRootState) => state.user.refreshToken
  );
  const [isUserAuthorized, setIsUserAuthorized] = useState(!!refreshToken);

  useEffect(() => {
    setIsUserAuthorized(!!refreshToken);
  }, [refreshToken]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        const localState = (location as ILocalState).state || {};

        return isUserAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { ...localState, from: location.pathname },
            }}
          />
        );
      }}
    />
  );
}
