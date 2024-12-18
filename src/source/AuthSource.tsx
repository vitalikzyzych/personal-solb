import { toaster } from "@/components/ui";
import {
  IChangePassword,
  ICreateProject,
  ISignIn,
  ISignUp,
} from "@/store/auth";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { processRequest } from "./processor";
const BASE_URL = "https://user-management-staging.solv.world";
import { BASE_AUTH_URL } from "constants/env";
const API_BASE_URL = BASE_AUTH_URL;
const NLP_BASE_URL = "https://nlp-api-go-staging.solv.world";

export const signIn = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };
  const requestParams = {
    method: "POST",
    url: BASE_URL + "/" + "auth/login",
    data: data,
  } as AxiosRequestConfig;

  requestParams.headers = {
    "Content-type": "application/json",
  };

  try {
    const response = await axios(requestParams);
    localStorage.setItem(
      "accessToken",
      response.data.access_token.access_token
    );
    localStorage.setItem(
      "refreshToken",
      response.data.access_token.refresh_token
    );
    return response.data.access_token; // Contains access_token, refresh_token, etc.
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error?.response?.data.error.includes("Account is not fully set up")) {
        return {
          needPasswordReset: true,
          userId: error?.response?.data.user_id,
        };
      } else {
        toaster({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          text: error.response?.data.error_description || error.message,
          type: "error",
        });
      }
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

export const logout = async () => {
  const requestParams = {
    method: "POST",
    url: BASE_URL + "/" + "auth/logout",
    data: {
      refresh_token: localStorage.getItem("refreshToken"),
    },
  } as AxiosRequestConfig;

  try {
    const response = await axios(requestParams);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    if (response.data?.message === "User logged out successfully") {
      return false;
    }
    return response.data; // Contains access_token, refresh_token, etc.
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error obtaining Keycloak token:",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any).response?.data || error.message
      );
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

export const createUser = async (payload: ISignUp) => {
  const res = await processRequest({
    method: "POST",
    data: payload,
    fullURL: true,
    url: API_BASE_URL + "/" + "auth/signup",
  });
  return {
    email: payload.email,
    registered: res.message === "User registered successfully",
  };
};

export const verifyUser = async (payload: ISignIn) => {
  const res = await processRequest({
    method: "POST",
    data: payload,
    fullURL: true,
    url: API_BASE_URL + "/" + "auth/login",
  });
  return {
    email: payload.username,
    verified: !!res.verified,
    userId: res.userId,
  };
};

export const changeUserPassword = async (payload: IChangePassword) => {
  const res = await processRequest({
    method: "PATCH",
    data: payload,
    fullURL: true,
    url: API_BASE_URL + "/" + "auth/reset-password",
  });
  return {
    reset: res.message === "Password reset successfully",
  };
};

export const checkUser = async () => {
  const res = await processRequest({
    method: "GET",
    fullURL: true,
    url: API_BASE_URL + "/" + "auth/check-user",
  });
  return res.user_info;
};

export const createProject = async (payload: ICreateProject) => {
  const res = await processRequest({
    method: "POST",
    fullURL: true,
    data: payload,
    url: NLP_BASE_URL + "/" + "api/v1/project",
  });
  console.log(res);
  return res;
};
