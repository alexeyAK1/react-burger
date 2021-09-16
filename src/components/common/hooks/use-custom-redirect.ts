import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../services/store";

export const useRedirectIfPathEqualTo = (path?:string) => {
    const history = useHistory();
    const redirectTo = useSelector((state: RootState) => state.user.redirectTo);

    useEffect(() => {
      if(redirectTo !== '' && (path && (path === redirectTo))){
        history.push(redirectTo);
      }
    }, [history, path, redirectTo]);
}