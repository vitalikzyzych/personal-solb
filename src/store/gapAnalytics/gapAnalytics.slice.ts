import { createSlice } from "@reduxjs/toolkit";

import { getList, getListAll } from "./gapAnalytics.actions";
import {
  IGapAnalytics,
  IGapAnalyticsAllResponse,
  IGapAnalyticsListResponse,
} from "./gapAnalytics.types";
import { PaginatorMeta } from "@/types";

interface IInitialSettingSliceState {
  allGapAnalytics: IGapAnalytics[];
  isGetting: boolean;
  isGettingDocuments: boolean;
  isGettingIdentity: boolean;
  isGettingMergingOf: boolean;
  isGettingPolling: boolean;
  isGettingTranscripts: boolean;
  isGettingValues: boolean;
  isLoading: boolean;
  meta: PaginatorMeta;
}

const initialState: IInitialSettingSliceState = {
  allGapAnalytics: [],
  isGetting: true,
  isGettingDocuments: true,
  isGettingIdentity: true,
  isGettingMergingOf: true,
  isGettingPolling: true,
  isGettingTranscripts: true,
  isGettingValues: true,
  isLoading: true,
  meta: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
};

const gapAnalyticsSlice = createSlice({
  name: "stakeholder",
  initialState,
  reducers: {
    resetMeta(state) {
      state.meta.page = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getListAll.fulfilled,
      (state, { payload }: { payload: IGapAnalyticsAllResponse }) => {
        state.allGapAnalytics = payload.content.data;
        state.isLoading = false;
        state.meta.total = payload.totalElements;
        state.meta.page = payload.pageNumber - 1;
      }
    );
    builder.addCase(getListAll.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getListAll.rejected, (state) => {
      state.isLoading = false;
    });

    // builder.addCase(
    //   getList.fulfilled,
    //   (state, { payload }: { payload: IGapAnalyticsListResponse }) => {
    //     state.allGapAnalytics = payload.content;
    //     state.isLoading = false;
    //     state.meta.total = payload.totalElements;
    //     state.meta.page = payload.pageNumber - 1;
    //   }
    // );
    // builder.addCase(getList.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getList.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export const { resetMeta } = gapAnalyticsSlice.actions;

export default gapAnalyticsSlice.reducer;
