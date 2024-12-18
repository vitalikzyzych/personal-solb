import { createSlice } from "@reduxjs/toolkit";
import {
  ContentKeys,
  IReviewStakeholder,
  IReviewValue,
  ISelectedData,
  ISelectedDataResponse,
} from "./textanalysis.types";
import {
  getDocuments,
  getReviewStakeholders,
  getReviewValues,
} from "./textanalysis.actions";
import type { PaginatorMeta } from "@/types";

interface IState {
  activeStep: number;
  isGettingDocuments: boolean;
  selectDocuments: ISelectedData[];
  selectedDocuments: ISelectedData[];
  meta: PaginatorMeta;
  reviewValues: IReviewValue[];
  reviewStakeholders: IReviewStakeholder[];
  isGettingReviewValues: boolean;
  isGettingReviewStakeholders: boolean;
  activeMenu: ContentKeys;
}

const initialState: IState = {
  activeStep: 0,
  isGettingDocuments: false,
  isGettingReviewValues: false,
  isGettingReviewStakeholders: false,
  selectDocuments: [],
  selectedDocuments: [],
  reviewValues: [],
  reviewStakeholders: [],
  activeMenu: ContentKeys.STAKEHOLDERS_NEW,
  meta: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
};

const textAnalysisSlice = createSlice({
  name: "textAnalysis",
  initialState,
  reducers: {
    setActiveStep(state, action) {
      state.activeStep = action.payload;
    },
    resetMeta(state) {
      state.meta.page = 0;
    },
    setSelectedDocuments(state, action) {
      state.selectedDocuments = action.payload;
    },
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getDocuments.fulfilled,
      (state, { payload }: { payload: ISelectedDataResponse }) => {
        state.selectDocuments = payload.content;
        state.isGettingDocuments = false;
        state.meta.total = payload.totalElements;
        state.meta.page = payload.pageNumber - 1;
      }
    );
    builder.addCase(getDocuments.pending, (state) => {
      state.isGettingDocuments = true;
    });
    builder.addCase(getDocuments.rejected, (state) => {
      state.isGettingDocuments = false;
    });

    builder.addCase(
      getReviewValues.fulfilled,
      (state, { payload }: { payload: IReviewValue[] }) => {
        state.reviewValues = payload;
      }
    );
    builder.addCase(getReviewValues.pending, (state) => {
      state.isGettingReviewValues = true;
    });
    builder.addCase(getReviewValues.rejected, (state) => {
      state.isGettingReviewValues = false;
    });

    builder.addCase(getReviewStakeholders.fulfilled, (state, { payload }) => {
      state.reviewStakeholders = payload;
    });
    builder.addCase(getReviewStakeholders.pending, (state) => {
      state.isGettingReviewStakeholders = true;
    });
    builder.addCase(getReviewStakeholders.rejected, (state) => {
      state.isGettingReviewStakeholders = false;
    });
  },
});

export const { setActiveStep, resetMeta, setSelectedDocuments, setActiveMenu } =
  textAnalysisSlice.actions;

export default textAnalysisSlice.reducer;
