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

interface IFetchProps {
  url: string;
  isProtect?: boolean;
  method?: TMethod;
  body?: BodyInit;
}

interface IFetchPropsWithError extends IFetchProps {
  responseError: Response;
}

type TMethod = "GET" | "POST" | "PATCH";

export const MAIN_URL = "https://norma.nomoreparties.space/api";
export const REFRESH_TOKEN = "refresh_token";
export const TOKEN = "token";

export class Api {
  private static instance: Api;
  private localToken: string;
  private localRefreshToken: string;
  private localAbortController: AbortController | null;
  private isLoadingRefreshTokenLocal: boolean;

  private constructor() {
    const refreshToken = getCookie(REFRESH_TOKEN);
    const token = getCookie(TOKEN);
    this.localToken = "";
    this.localRefreshToken = "";
    this.localAbortController = null;
    this.isLoadingRefreshTokenLocal = false;

    if (refreshToken) {
      this.localRefreshToken = refreshToken;
    }
    if (token) {
      this.localToken = token;
    }
  }

  public static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  get token() {
    const token = getCookie(TOKEN);

    return this.localToken ? this.localToken : token ? token : "";
  }

  set token(token: string) {
    if (token) {
      const t = token.split("Bearer ")[1];
      setCookie(TOKEN, t, { path: "/" });
      this.localToken = t;
    } else {
      this.localToken = "";
    }
  }

  get isLoadingRefreshToken() {
    return this.isLoadingRefreshTokenLocal;
  }

  set isLoadingRefreshToken(isLoading: boolean) {
    this.isLoadingRefreshTokenLocal = isLoading;
  }

  get refreshToken() {
    return this.localRefreshToken;
  }

  set refreshToken(token: string) {
    if (token) {
      setCookie(REFRESH_TOKEN, token, { path: "/" });
      this.localRefreshToken = token;
    } else {
      this.localRefreshToken = "";
    }
  }

  public logOut() {
    deleteCookie(REFRESH_TOKEN);
    this.localRefreshToken = "";
    this.localToken = "";
    this.localAbortController = null;
  }

  public setAbortController() {
    this.localAbortController = new AbortController();
  }

  public getAbortFetch() {
    if (this.localAbortController) {
      this.localAbortController.abort();
    }
  }

  public async postFetch<T>(url: string, body: BodyInit) {
    return this.mainFetch<T>({ url, isProtect: false, method: "POST", body });
  }

  public async postProtectedFetch<T>(url: string, body: BodyInit) {
    return this.mainFetch<T>({ url, isProtect: true, method: "POST", body });
  }

  public async patchProtectedFetch<T>(url: string, body: BodyInit) {
    return this.mainFetch<T>({ url, isProtect: true, method: "PATCH", body });
  }

  public async getProtectedFetch<T>(url: string) {
    return this.mainFetch<T>({ url, isProtect: true, method: "GET" });
  }

  public async getFetch<T>(url: string) {
    return this.mainFetch<T>({ url, method: "GET" });
  }

  private async mainFetch<T>({
    url,
    isProtect = false,
    method,
    body,
  }: IFetchProps) {
    this.ifNeedInitialRestartAbortController();
    await this.ifNeedInitialRefreshToken(isProtect);

    const finalUrl = MAIN_URL + url;
    const res = await this.simpleFetch({
      url: finalUrl,
      isProtect,
      method,
      body,
    });

    if (res.status === 200) {
      return (await res.json()) as T;
    }

    return await this.refreshTokenOrLogout<T>({
      url: finalUrl,
      isProtect,
      method,
      body,
      responseError: res,
    });
  }

  private ifNeedInitialRestartAbortController() {
    if (this.localAbortController?.signal.aborted) {
      this.localAbortController = null;
    }
  }

  private async ifNeedInitialRefreshToken(isProtect: boolean) {
    if (isProtect && !this.localToken) {
      await this.refreshTokenFetch();
    }
  }

  private async refreshTokenOrLogout<T>({
    url,
    isProtect = false,
    method,
    body,
    responseError,
  }: IFetchPropsWithError) {
    const fetchError = (await responseError.json()) as IErrorServer;

    if (this.isNeedRefreshToken(fetchError)) {
      await this.refreshTokenFetch();
      return await this.getNewFetchAfterTokenRefresh<T>({
        url,
        isProtect,
        method,
        body,
      });
    } else {
      this.logOut();
      throw new Error("" + responseError.status + "===" + fetchError.message);
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

  public async refreshTokenFetch() {
    if (!this.isLoadingRefreshToken) {
      this.isLoadingRefreshToken = true;
      const userTokens = await this.postFetch<IRefreshResponse>(
        "/auth/token",
        JSON.stringify({ token: this.refreshToken })
      );

      if (userTokens) {
        const token = userTokens.accessToken.split("Bearer ")[1];

        setCookie(TOKEN, token, { path: "/" });
        this.localToken = token;
        this.localRefreshToken = userTokens.refreshToken;
        setCookie(REFRESH_TOKEN, userTokens.refreshToken, { path: "/" });
      } else {
        this.logOut();
      }
      this.isLoadingRefreshToken = false;
    }
  }

  private async getNewFetchAfterTokenRefresh<T>({
    url,
    isProtect = false,
    method,
    body,
  }: IFetchProps) {
    if (this.localRefreshToken) {
      const res = await this.simpleFetch({
        url,
        isProtect,
        method,
        body,
      });

      if (res.status === 200) {
        this.localAbortController = null;
        return (await res.json()) as T;
      }

      this.logOut();
      throw new Error(`401===${errorAuthorized.unauthorized}`);
    } else {
      this.logOut();
      throw new Error(`401===${errorAuthorized.unauthorized}`);
    }
  }

  private async simpleFetch({
    url,
    isProtect = false,
    method,
    body,
  }: IFetchProps) {
    const newFetchFields = method
      ? this.getFiledRequest(method, isProtect, body)
      : undefined;
    return await fetch(url, newFetchFields);
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
    if (this.localAbortController) {
      retObject.signal = this.localAbortController.signal;
    }

    return retObject;
  }

  public waitFor(
    condition: () => boolean,
    cb: () => void,
    delay?: number,
  ){
    if (!condition()) {
      setTimeout(this.waitFor.bind(null, condition, cb, delay), delay || 100);
    } else {
      cb();
    }
  };

  public waitForAsync = (condition: () => boolean, delay?: number) =>
    new Promise<void>((resolve) => this.waitFor(condition, resolve, delay));
}
