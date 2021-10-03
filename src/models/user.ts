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

export interface IUserDataResponse extends ISuccessResponse {
  user: IUserFields;
}

export interface IUserResponse extends IRefreshResponse {
  user: IUserFields;
}

export interface IOwner {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}
