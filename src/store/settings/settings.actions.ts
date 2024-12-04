import { SettingsSource } from "@/source";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTheme = createAsyncThunk("settings/getTheme", async () => {
  return await SettingsSource.getTheme();
});

export const setTheme = createAsyncThunk(
  "settings/setTheme",
  async (theme: string) => {
    return await SettingsSource.setTheme(theme);
  }
);
