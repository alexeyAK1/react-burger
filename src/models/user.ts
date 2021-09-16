export interface IUserFields {
  email: string;
  name: string;
}

export interface ISuccessResponse {
  success: boolean;
}

export interface IRefreshResponse extends ISuccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILogoutResponse extends ISuccessResponse {
  message: string;
}

export interface IUserResponse extends IRefreshResponse {
  user: IUserFields;
}
