import { deleteCookie, getCookie, setCookie } from "../common/functions";
import { IRefreshResponse, ISuccessResponse } from "../models/user";

interface IErrorServer extends ISuccessResponse {
  message: string;
}

export enum errorAuthorized {
  jwtExpired = "jwt expired",
  youShouldBeAuthorized = "You should be authorised",
  unauthorized = "Unauthorized",
  tokenIsInvalid = "Token is invalid",
  emailOrPasswordAreIncorrect = "email or password are incorrect",
}

type TMethod = "GET" | "POST" | "PATCH";

export const MAIN_URL = "https://norma.nomoreparties.space/api";
export const REFRESH_TOKEN = "refresh_token";

export class Api {
  private static instance: Api;
  private localToken: string;
  private localRefreshToken: string;

  private constructor() {
    const refreshToken = getCookie(REFRESH_TOKEN);
    this.localToken = "";
    this.localRefreshToken = "";

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
      const t = token.split("Bearer ")[1];
      this.localToken = t;
    } else {
      this.localToken = "";
    }
  }

  get refreshToken() {
    return this.localRefreshToken;
  }

  set refreshToken(token: string) {
    if (token) {
      setCookie(REFRESH_TOKEN, token);
      this.localRefreshToken = token;
    } else {
      this.localRefreshToken = "";
    }
  }

  public logOut() {
    deleteCookie(REFRESH_TOKEN);
    this.localRefreshToken = "";
    this.localToken = "";
  }

  public async postFetch<T>(url: string, body: BodyInit) {
    return this.mainFetch<T>(url, false, "POST", body);
  }

  public async postProtectedFetch<T>(url: string, body: BodyInit) {
    return this.mainFetch<T>(url, true, "POST", body);
  }

  public async patchProtectedFetch<T>(url: string, body: BodyInit) {
    return this.mainFetch<T>(url, true, "PATCH", body);
  }

  public async getProtectedFetch<T>(url: string) {
    return this.mainFetch<T>(url, true, "GET");
  }

  public async getFetch<T>(url: string) {
    return this.mainFetch<T>(url);
  }

  private async mainFetch<T>(
    url: string,
    isProtect: boolean = false,
    method?: TMethod,
    body?: BodyInit
  ) {
    const finalUrl = MAIN_URL + url;
    const fetchFields = method
      ? this.getFiledRequest(method, isProtect, body)
      : undefined;
    const res = await fetch(finalUrl, fetchFields);

    if (res.status === 200) {
      return (await res.json()) as T;
    }
    const fetchError = (await res.json()) as IErrorServer;

    if (this.isNeedRefreshToken(fetchError)) {
      await this.refreshTokenFetch();

      if (this.localRefreshToken) {
        const newFetchFields = method
          ? this.getFiledRequest(method, isProtect, body)
          : undefined;
        const res = await fetch(finalUrl, newFetchFields);

        if (res.status === 200) {
          return (await res.json()) as T;
        }

        this.logOut();
        throw new Error(`401===${errorAuthorized.unauthorized}`);
      } else {
        this.logOut();
        throw new Error(`401===${errorAuthorized.unauthorized}`);
      }
    } else {
      this.logOut();
      throw new Error("" + res.status + "===" + fetchError.message);
    }
  }

  private isNeedRefreshToken(fetchError: IErrorServer): boolean {
    return (
      !!this.localRefreshToken &&
      !!fetchError.message &&
      (errorAuthorized.jwtExpired === fetchError.message ||
        errorAuthorized.youShouldBeAuthorized === fetchError.message)
    );
  }

  private async refreshTokenFetch() {
    const userTokens = await this.postFetch<IRefreshResponse>(
      "/auth/token",
      JSON.stringify({ token: this.refreshToken })
    );

    if (userTokens) {
      const token = userTokens.accessToken.split("Bearer ")[1];

      this.localToken = token;
      this.localRefreshToken = userTokens.refreshToken;
      setCookie(REFRESH_TOKEN, userTokens.refreshToken);
    } else {
      this.logOut();
    }
  }

  private getFiledRequest(
    method: TMethod,
    isProtect: boolean = false,
    body?: BodyInit
  ) {
    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };
    if (isProtect) {
      headers.Authorization = "Bearer " + this.localToken;
    }
    const retObject: RequestInit = {
      method,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers,
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    if (body) {
      retObject.body = body;
    }

    return retObject;
  }
}
