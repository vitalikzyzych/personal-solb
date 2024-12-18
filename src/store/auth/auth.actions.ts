import { AuthSource } from "@/source";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IChangePassword,
  ICreateProject,
  ISignIn,
  ISignUp,
} from "./auth.types";

export const createUser = createAsyncThunk(
  "user/create",
  async (payload: ISignUp) => {
    const response = await AuthSource.createUser(payload);
    return response;
  }
);

export const verifyUser = createAsyncThunk(
  "user/verify",
  async (payload: ISignIn) => {
    const response = await AuthSource.verifyUser(payload);
    return response;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (payload: IChangePassword) => {
    const response = await AuthSource.changeUserPassword(payload);
    return response;
  }
);

export const checkUser = createAsyncThunk("user/checkUser", async () => {
  const response = await AuthSource.checkUser();
  return response;
});

export const createProject = createAsyncThunk(
  "user/createProject",
  async (payload: ICreateProject) => {
    const response = await AuthSource.createProject(payload);
    return response;
  }
);
