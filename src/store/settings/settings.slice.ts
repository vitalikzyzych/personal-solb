import { createSlice } from "@reduxjs/toolkit";

import { getTheme, setTheme } from "./settings.actions";

interface IInitialSettingSliceState {
  theme: string;
  isLoading: boolean;
}

const initialState: IInitialSettingSliceState = {
  theme: "vibrant",
  isLoading: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTheme.fulfilled, (state, { payload }) => {
      state.theme = payload as string;
      state.isLoading = false;
    });

    builder.addCase(getTheme.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setTheme.fulfilled, (state, { payload }) => {
      state.theme = payload as string;
    });
  },
});

export default settingsSlice.reducer;
