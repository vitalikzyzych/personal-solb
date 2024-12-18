import { createSlice } from "@reduxjs/toolkit";

import { checkUser, createUser } from "./auth.actions";

import { ISignUpResponse, ITempUserData, IUser } from "./auth.types";

interface IInitialAuthSliceState {
  isCheckingUser: boolean;
  isCreatingUser: boolean;
  isGettingUser: boolean;
  signUpPayload: ISignUpResponse;
  user: IUser;
  tempUserData: ITempUserData;
}

const initialState: IInitialAuthSliceState = {
  isCheckingUser: false,
  isCreatingUser: false,
  isGettingUser: false,
  signUpPayload: {
    email: "",
    registered: false,
  },
  user: {} as IUser,
  tempUserData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTempUserData(state, { payload }) {
      state.tempUserData = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isCreatingUser = true;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isCreatingUser = false;
      state.signUpPayload = payload;
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isCreatingUser = false;
    });

    builder.addCase(checkUser.pending, (state) => {
      state.isCheckingUser = true;
    });
    builder.addCase(checkUser.fulfilled, (state, { payload }) => {
      state.isCheckingUser = false;
      state.user = payload;
    });
    builder.addCase(checkUser.rejected, (state) => {
      state.isCheckingUser = false;
    });
  },
});

export const { setTempUserData } = authSlice.actions;

export default authSlice.reducer;
