import { createSlice } from "@reduxjs/toolkit";

import { getList, getProjects } from "./organization.actions";
import { IOrganization, IOrganizationProject } from "./organization.types";

interface IInitialSettingSliceState {
  isLoading: boolean;
  isLoadingProjects: boolean;
  organizations: IOrganization[];
  projects: IOrganizationProject[];
}

const initialState: IInitialSettingSliceState = {
  isLoading: true,
  isLoadingProjects: true,
  organizations: [],
  projects: [],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, { payload }) => {
      state.organizations = payload;
      state.isLoading = false;
    });

    builder.addCase(getList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getList.rejected, (state, { payload }) => {
      state.isLoading = false;
    });

    builder.addCase(getProjects.fulfilled, (state, { payload }) => {
      state.projects = payload;
      state.isLoadingProjects = false;
    });
    builder.addCase(getProjects.pending, (state) => {
      state.isLoadingProjects = true;
    });
    builder.addCase(getProjects.rejected, (state, { payload }) => {
      state.isLoadingProjects = false;
    });
  },
});

export default settingsSlice.reducer;
