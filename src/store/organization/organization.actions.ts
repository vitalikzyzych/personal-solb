import { OrganizationSource } from "@/source";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getList = createAsyncThunk("organization/getList", async () => {
  return await OrganizationSource.getList();
});

export const getProjects = createAsyncThunk(
  "organization/getProjects",
  async () => {
    return await OrganizationSource.getProjects();
  }
);
