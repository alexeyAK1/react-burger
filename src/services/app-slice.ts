import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState } from '../models/app-store';

const initialState: IAppState = {
  isLoading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAppError(state, action: PayloadAction<Error | null>) {
      state.error = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setAppLoading, setAppError } = appSlice.actions;
