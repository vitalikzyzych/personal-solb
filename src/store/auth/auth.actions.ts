import { AuthSource } from "@/source";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/get", async () => {
  const user = await AuthSource.getUser();
  return user;
});
