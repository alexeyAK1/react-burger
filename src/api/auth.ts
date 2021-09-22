import {
  ILogoutResponse,
  IRefreshResponse,
  IUserDataResponse,
  IUserResponse,
} from "../models/user";
import { Api } from "./api";

const api = Api.getInstance();
const LOCAL_URL = "/auth";

export const getRegisterUser = async (
  email: string,
  password: string,
  name: string
) => {
  return await api.postFetch<IUserResponse>(
    LOCAL_URL + "/register",
    JSON.stringify({ email, password, name })
  );
};

export const getLoginUser = async (email: string, password: string) => {
  return await api.postFetch<IUserResponse>(
    LOCAL_URL + "/login",
    JSON.stringify({ email, password })
  );
};

export const getLogout = async (refreshToken: string) => {
  return await api.postFetch<ILogoutResponse>(
    LOCAL_URL + "/logout",
    JSON.stringify({ token: refreshToken })
  );
};

export const getUser = async () => {
  return await api.getProtectedFetch<IUserDataResponse>(LOCAL_URL + "/user");
};

export const updateUser = async (
    email: string,
    password: string,
    name: string
  ) => {
    return await api.patchProtectedFetch<IUserDataResponse>(
      LOCAL_URL + "/user",
      JSON.stringify({ email, password, name })
    );
  };

  export const getRefreshToken = async () => {
    const userTokens = await api.postFetch<IRefreshResponse>(
      "/auth/token",
      JSON.stringify({ token: api.refreshToken })
    );

    if (userTokens) {
      const token = userTokens.accessToken.split("Bearer ")[1];

      api.token = token;
      api.refreshToken = userTokens.refreshToken;
    } else {
      api.logOut();
    }

    return userTokens;
  }