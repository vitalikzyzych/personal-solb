import { createAsyncThunk } from "@reduxjs/toolkit";
import { GapAnalyticsSource } from "@/source";

import { IGapAnalyticsListParams } from "./gapAnalytics.types";

export const getListAll = createAsyncThunk(
  "gapAnalytics/getListAll",
  async (payload: IGapAnalyticsListParams) => {
    return await GapAnalyticsSource.getListAll(payload);
  }
);

export const getList = createAsyncThunk(
  "gapAnalytics/getList",
  async (payload: IGapAnalyticsListParams) => {
    return await GapAnalyticsSource.getList(payload);
  }
);
