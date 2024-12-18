import { toaster } from "@/components";
import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "constants/env";
const API_BASE_URL = BASE_URL;

export const processRequest = async ({
  method = "GET",
  url = "",
  data = {},
  params = {},
  fullURL = false,
  showErrorToaster = true,
  customErrorMessage = "",
  version = "v1",
}) => {
  const requestParams = {
    method,
    url: fullURL ? url : API_BASE_URL + "/" + url,
    data,
    params,
  } as AxiosRequestConfig;
  if (localStorage.getItem("accessToken")) {
    requestParams.headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
  }
  try {
    const response = await axios(requestParams);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      let errorMessage = "";

      if (!customErrorMessage) {
        if (error?.response?.data.error.includes("Invalid user credentials")) {
          errorMessage = "Invalid user credentials";
        }
      }
      if (error?.response?.data.error.includes("Account is not fully set up")) {
        return {
          verified: true,
          userId: error?.response?.data.user_id,
        };
      }

      if (showErrorToaster && errorMessage) {
        toaster({
          text: "Something went wrong",
          description: customErrorMessage || errorMessage,
          type: "error",
          autoClose: 5000,
          position: "top-right",
        });
      }
      return error;
    }
  }
};
