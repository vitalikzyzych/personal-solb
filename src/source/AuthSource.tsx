import { toaster } from "@/components/ui";
import axios, { AxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
const BASE_URL = "https://user-management-staging.solv.world/";

export const signIn = async (username: string, password: string) => {
  const data = {
    username,
    password,
  };
  const requestParams = {
    method: "POST",
    url: BASE_URL + "auth/login",
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
    if (error instanceof Error) {
      toaster({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        text: (error as any).response?.data.error_description || error.message,
        type: "error",
      });
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

export const logout = async () => {
  const requestParams = {
    method: "POST",
    url: BASE_URL + "auth/logout",
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

export const getUser = async () => {
  const token = localStorage.getItem("accessToken");
  const { email, name } = jwtDecode(token as string) as {
    email: string;
    name: string;
  };

  return {
    email,
    name,
  };
};
