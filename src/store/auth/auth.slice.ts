import { createSlice } from "@reduxjs/toolkit";

import { getUser } from "./auth.actions";

import { IUser } from "./auth.types";

interface IInitialAuthSliceState {
  isGettingUser: boolean;
  user: IUser;
}

const initialState: IInitialAuthSliceState = {
  isGettingUser: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isGettingUser = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isGettingUser = false;
      state.user = payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isGettingUser = false;
    });
  },
});

export default authSlice.reducer;
