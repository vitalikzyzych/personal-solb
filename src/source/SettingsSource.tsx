import { jwtDecode } from "jwt-decode";

export const getTheme = async () => {
  const theme = localStorage.getItem("userTheme") || "vibrant";
  return theme;
};

export const setTheme = async (theme: string) => {
  localStorage.setItem("userTheme", theme);
  return theme;
};
