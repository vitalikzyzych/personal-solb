import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "constants/env";
const API_BASE_URL = BASE_URL;

export const processRequest = async ({
  method = "GET",
  url = "",
  data = {},
  params = {},
  fullURL = false,
  version = "v1",
}) => {
  const requestParams = {
    method,
    url: fullURL ? url : API_BASE_URL + "/" + version + "/" + url,
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
  } catch (error) {
    return error;
  }
};
