import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { Api } from "../api/api";

import {
  getLoginUser,
  getLogout,
  getRefreshToken,
  getRegisterUser,
} from "../api/auth";
import { IRootStore, IUserState } from "../models/app-store";
import { IRefreshResponse, IUserFields } from "../models/user";
import { setAppError } from "./app-slice";

const api = Api.getInstance();
console.log(api.token);
const initialState: IUserState = {
  user: {
    name: "",
    email: "",
  },
  isLoading: false,
  redirectTo: "",
  errorText: "",
  refreshToken: api.refreshToken,
};

const setToken = (
  userResponse: IRefreshResponse,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
  api.token = userResponse.accessToken;
  api.refreshToken = userResponse.refreshToken;
  dispatch(setRefreshToken(userResponse.refreshToken));
};

const deleteToken = (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
  api.logOut();
  dispatch(setRefreshToken(""));
};

export const getRegisterFetch = createAsyncThunk(
  "user/getRegisterFetch",
  async function (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    { rejectWithValue, dispatch, getState }
  ) {
    const {
      user: { isLoading },
    } = getState() as IRootStore;

    if (!isLoading) {
      dispatch(setIsLoading(true));

      try {
        const userResponse = await getRegisterUser(email, password, name);

        if (userResponse.success) {
          setToken(userResponse, dispatch);
          dispatch(setUser(userResponse.user));
        }
      } catch (error) {
        if ((error as Error).message === "403") {
          dispatch(setError("Такой пользователь уже существует"));
        } else {
          rejectWithValue(error);
          dispatch(setAppError(error as Error));
        }
      }
    }
  }
);

export const getLoginFetch = createAsyncThunk(
  "user/getLoginFetch",
  async function (
    { email, password }: { email: string; password: string },
    { rejectWithValue, dispatch, getState }
  ) {
    const {
      user: { isLoading },
    } = getState() as IRootStore;
    console.log(isLoading);
    if (!isLoading) {
      dispatch(setIsLoading(true));

      try {
        dispatch(setRedirectPath(""));
        const userResponse = await getLoginUser(email, password);

        if (userResponse.success) {
          setToken(userResponse, dispatch);
          dispatch(setUser(userResponse.user));
          dispatch(setRedirectPath("/"));
        }
      } catch (error) {
        rejectWithValue(error);
        dispatch(setAppError(error as Error));
      }
    }
  }
);

export const getRefreshTokenFetch = createAsyncThunk(
  "user/getRefreshTokenFetch",
  async function (_, { rejectWithValue, dispatch, getState }) {
    const {
      user: { refreshToken },
    } = getState() as IRootStore;
    dispatch(setIsLoading(true));

    try {
      dispatch(setRedirectPath(""));
      const userResponse = await getRefreshToken(refreshToken);

      if (userResponse.success) {
        setToken(userResponse, dispatch);
      }
    } catch (error) {
      rejectWithValue(error);
      dispatch(setAppError(error as Error));
    }
  }
);

export const getLogoutFetch = createAsyncThunk(
  "user/getLogoutFetch",
  async function (_, { rejectWithValue, dispatch, getState }) {
    const {
      user: { isLoading, refreshToken },
    } = getState() as IRootStore;

    if (!isLoading) {
      dispatch(setIsLoading(true));

      try {
        dispatch(setRedirectPath(""));
        const userResponse = await getLogout(refreshToken);

        if (userResponse.success) {
          deleteToken(dispatch);
          dispatch(setUser({ email: "", name: "" }));
        }
      } catch (error) {
        rejectWithValue(error);
        dispatch(setAppError(error as Error));
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserFields>) {
      state.user = action.payload;
    },
    setRedirectPath(state, action: PayloadAction<string>) {
      state.redirectTo = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.errorText = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    // [getRegisterFetch.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // @ts-expect-error
    [getRegisterFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getRegisterFetch.rejected]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getLoginFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getLoginFetch.rejected]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getRefreshTokenFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getRefreshTokenFetch.rejected]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getLogoutFetch.fulfilled]: (state) => {
      state.isLoading = false;
    },
    // @ts-expect-error
    [getLogoutFetch.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;

const { setUser, setRedirectPath, setRefreshToken, setIsLoading } =
  userSlice.actions;
export const { setError } = userSlice.actions;
