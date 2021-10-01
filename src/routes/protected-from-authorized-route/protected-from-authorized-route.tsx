import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useSelector } from "../../components/hooks";
import { MAIN_PATH } from "../constants-path";

interface IProps extends RouteProps {
  children: React.ReactChild;
}

interface ILocalState {
  state: { from: string };
}

export default function ProtectedFromAuthorizedRoute({
  children,
  ...rest
}: IProps) {
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const [isUserAuthorized, setIsUserAuthorized] = useState(!!refreshToken);

  useEffect(() => {
    setIsUserAuthorized(!!refreshToken);
  }, [refreshToken]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isUserAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname:
                ((location as ILocalState).state &&
                  (location as ILocalState).state.from) ||
                MAIN_PATH,
              state: {},
            }}
          />
        );
      }}
    />
  );
}
