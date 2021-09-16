import {
  deleteCookie,
  getAuthToken,
  getCookie,
  setCookie,
} from "../common/functions";

export const MAIN_URL = "https://norma.nomoreparties.space/api";
export const ACCESS_TOKEN = "token";
export const REFRESH_TOKEN = "refresh_token";

export class Api {
  private static instance: Api;
  private localToken: string;
  private localRefreshToken: string;

  private constructor() {
    const token = getCookie(ACCESS_TOKEN);
    const refreshToken = getCookie(REFRESH_TOKEN);
    this.localToken = "";
    this.localRefreshToken = "";

    if (token) {
      this.localToken = token;
    }
    if (refreshToken) {
      this.localRefreshToken = refreshToken;
    }
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  get token() {
    return this.localToken;
  }

  set token(token: string) {
    if (token) {
      setCookie(ACCESS_TOKEN, token);
    }
    this.localToken = token;
  }
  get refreshToken() {
    return this.localRefreshToken;
  }

  set refreshToken(token: string) {
    if (token) {
      setCookie(REFRESH_TOKEN, token);
    }
    this.localRefreshToken = token;
  }

  public logOut() {
    deleteCookie(REFRESH_TOKEN);
    deleteCookie(ACCESS_TOKEN);
    this.localRefreshToken = "";
    this.localToken = "";
  }

  public async postFetch<T>(url: string, body: BodyInit) {
    const res = await fetch(MAIN_URL + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });

    if (res.status === 200) {
      const authToken = getAuthToken(res);
      if (authToken) {
        this.localToken = authToken;
        setCookie(ACCESS_TOKEN, authToken);
      }
      const fetchData = (await res.json()) as T;

      return fetchData;
    }

    throw new Error("" + res.status);
  }

  public async postProtectedFetch<T>(url: string, body: BodyInit) {
    const res = await fetch(MAIN_URL + url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.localToken,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body,
    });

    if (res.status === 200) {
      const fetchData = (await res.json()) as T;

      return fetchData;
    }

    throw new Error("" + res.status);
  }

  public async getProtectedFetch<T>(url: string) {
    const res = await fetch(MAIN_URL + url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.localToken,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    if (res.status === 200) {
      const fetchData = await res.json();

      return fetchData.data as T;
    }

    throw new Error("" + res.status);
  }

  public async getFetch<T>(url: string) {
    const res = await fetch(MAIN_URL + url);

    if (res.status === 200) {
      const fetchData = await res.json();

      return fetchData.data as T;
    }

    throw new Error("" + res.status);
  }
}
