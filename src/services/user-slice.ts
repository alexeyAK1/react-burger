import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch
} from "@reduxjs/toolkit";
import { Api, errorAuthorized } from "../api/api";
import {
  getLoginUser,
  getLogout,
  getRegisterUser,
  getUser,
  updateUser
} from "../api/auth";
import { IRootStore, IUserState } from "../models/app-store";
import { IRefreshResponse, IUserFields } from "../models/user";
import { MAIN_PATH } from "../routes/constants-path";
import { setErrorInAsyncThunk } from "./common";


const api = Api.getInstance();

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
        const [errorSuccess, errorMessage] = (error as Error).message.split(
          "==="
        );
        if (errorSuccess === "403") {
          dispatch(setError(errorMessage));
        } else {
          setErrorInAsyncThunk(error as Error, dispatch, rejectWithValue);
        }
      }
      dispatch(setRefreshToken(api.refreshToken));
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
    if (!isLoading) {
      dispatch(setIsLoading(true));
      try {
        dispatch(setRedirectPath(""));
        const userResponse = await getLoginUser(email, password);

        if (userResponse.success) {
          setToken(userResponse, dispatch);
          dispatch(setUser(userResponse.user));
          dispatch(setRedirectPath(MAIN_PATH));
        }
      } catch (error) {
        const [errorSuccess, errorMessage] = (error as Error).message.split(
          "==="
        );
        if (
          errorSuccess === "401" &&
          errorMessage === errorAuthorized.emailOrPasswordAreIncorrect
        ) {
          alert("Не корректный логин или пароль");
        } else {
          setErrorInAsyncThunk(error as Error, dispatch, rejectWithValue);
        }
      }
    }
    dispatch(setRefreshToken(api.refreshToken));
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
          // dispatch(setRefreshToken(api.refreshToken));
        }else{
          deleteToken(dispatch);
          dispatch(setUser({ email: "", name: "" }));
        }
      } catch (error) {
        setErrorInAsyncThunk(error as Error, dispatch, rejectWithValue);
      }
    }
    dispatch(setRefreshToken(api.refreshToken));
  }
);

export const getUserFetch = createAsyncThunk(
  "user/getUserFetch",
  async function (_, { rejectWithValue, dispatch, getState }) {
    const {
      user: { isLoading },
    } = getState() as IRootStore;

    if (!isLoading) {
      dispatch(setIsLoading(true));
      try {
        const userResponse = await getUser();

        if (userResponse.success) {
          dispatch(setUser(userResponse.user));
          dispatch(setRefreshToken(api.refreshToken));
        } else {
          console.log(userResponse);
        }
      } catch (error) {
        const [errorSuccess, errorMessage] = (error as Error).message.split(
          "==="
        );

        if (
          errorSuccess === "403" &&
          errorMessage === errorAuthorized.jwtExpired
        ) {
          // alert("");
        } else {
          setErrorInAsyncThunk(error as Error, dispatch, rejectWithValue);
        }
      }
    }
    dispatch(setRefreshToken(api.refreshToken));
  }
);

export const updateUserFetch = createAsyncThunk(
  "user/updateUserFetch",
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
        const userResponse = await updateUser(email, password, name);

        if (userResponse.success) {
          dispatch(setUser(userResponse.user));
          dispatch(setRefreshToken(api.refreshToken));
        }
      } catch (error) {
        setErrorInAsyncThunk(error as Error, dispatch, rejectWithValue);
      }
    }
    dispatch(setRefreshToken(api.refreshToken));
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
    [getRegisterFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [getRegisterFetch.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
    [getLoginFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [getLoginFetch.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
    [getLogoutFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [getLogoutFetch.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
    [getUserFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [getUserFetch.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
    [updateUserFetch.fulfilled.toString()]: (state) => {
      state.isLoading = false;
    },
    [updateUserFetch.rejected.toString()]: (state) => {
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;

const { setUser, setRedirectPath, setRefreshToken, setIsLoading } =
  userSlice.actions;
export const { setError } = userSlice.actions;
