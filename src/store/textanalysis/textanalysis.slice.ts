import { createSlice } from "@reduxjs/toolkit";
import type {
  ISelectedData,
  ISelectedDataResponse,
} from "./textanalysis.types";
import { getDocuments } from "./textanalysis.actions";
import type { PaginatorMeta } from "@/types";

interface IState {
  activeStep: number;
  isGettingDocuments: boolean;
  selectDocuments: ISelectedData[];
  selectedDocuments: ISelectedData[];
  meta: PaginatorMeta;
}

const initialState: IState = {
  activeStep: 0,
  isGettingDocuments: false,
  selectDocuments: [],
  selectedDocuments: [],
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
  },
});

export const { setActiveStep, resetMeta, setSelectedDocuments } =
  textAnalysisSlice.actions;

export default textAnalysisSlice.reducer;
