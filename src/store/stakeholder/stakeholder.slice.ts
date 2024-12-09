import { createSlice } from "@reduxjs/toolkit";

import {
  getList,
  getStakeholder,
  getStakeholderDocuments,
  getStakeholderIdentity,
  getStakeholderMergingOf,
  getStakeholderPolling,
  getStakeholderTranscripts,
  getStakeholderValues,
} from "./stakeholder.actions";
import {
  IStakeholder,
  IStakeholderDocument,
  IStakeholderIdentity,
  IStakeholderMergingOf,
  IStakeholderPolling,
  IStakeholderTranscript,
} from "./stakeholder.types";

interface IInitialSettingSliceState {
  isGetting: boolean;
  isGettingDocuments: boolean;
  isGettingIdentity: boolean;
  isGettingMergingOf: boolean;
  isGettingPolling: boolean;
  isGettingTranscripts: boolean;
  isGettingValues: boolean;
  isLoading: boolean;
  stakeholder: IStakeholder;
  stakeholders: IStakeholder[];
  stakeholderDocuments: IStakeholderDocument[];
  stakeholderIdentity: IStakeholderIdentity;
  stakeholderMergingOf: IStakeholderMergingOf[];
  stakeholderPolling: IStakeholderPolling[];
  stakeholderTranscripts: IStakeholderTranscript[];
  stakeholderValues: object;
}

const initialState: IInitialSettingSliceState = {
  isGetting: true,
  isGettingDocuments: true,
  isGettingIdentity: true,
  isGettingMergingOf: true,
  isGettingPolling: true,
  isGettingTranscripts: true,
  isGettingValues: true,
  isLoading: true,
  stakeholder: { id: "" },
  stakeholders: [],
  stakeholderDocuments: [],
  stakeholderIdentity: {},
  stakeholderMergingOf: [],
  stakeholderPolling: [],
  stakeholderTranscripts: [],
  stakeholderValues: {},
};

const stakeholderSlice = createSlice({
  name: "stakeholder",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, { payload }) => {
      state.stakeholders = payload;
      state.isLoading = false;
    });
    builder.addCase(getList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getList.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getStakeholder.fulfilled, (state, { payload }) => {
      state.stakeholder = payload;
      state.isGetting = false;
    });
    builder.addCase(getStakeholder.pending, (state) => {
      state.isGetting = true;
    });
    builder.addCase(getStakeholder.rejected, (state) => {
      state.isGetting = false;
    });

    builder.addCase(getStakeholderValues.fulfilled, (state, { payload }) => {
      state.stakeholderValues = payload;
      state.isGettingValues = false;
    });
    builder.addCase(getStakeholderValues.pending, (state) => {
      state.isGettingValues = true;
    });
    builder.addCase(getStakeholderValues.rejected, (state) => {
      state.isGettingValues = false;
    });

    builder.addCase(getStakeholderIdentity.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.stakeholderIdentity = payload;
      state.isGettingIdentity = false;
    });
    builder.addCase(getStakeholderIdentity.pending, (state) => {
      state.isGettingIdentity = true;
    });
    builder.addCase(getStakeholderIdentity.rejected, (state) => {
      state.isGettingIdentity = false;
    });

    builder.addCase(getStakeholderDocuments.fulfilled, (state, { payload }) => {
      state.stakeholderDocuments = payload;
      state.isGettingDocuments = false;
    });
    builder.addCase(getStakeholderDocuments.pending, (state) => {
      state.isGettingDocuments = true;
    });
    builder.addCase(getStakeholderDocuments.rejected, (state) => {
      state.isGettingDocuments = false;
    });

    builder.addCase(
      getStakeholderTranscripts.fulfilled,
      (state, { payload }) => {
        state.stakeholderTranscripts = payload;
        state.isGettingTranscripts = false;
      }
    );
    builder.addCase(getStakeholderTranscripts.pending, (state) => {
      state.isGettingTranscripts = true;
    });
    builder.addCase(getStakeholderTranscripts.rejected, (state) => {
      state.isGettingTranscripts = false;
    });

    builder.addCase(getStakeholderPolling.fulfilled, (state, { payload }) => {
      state.stakeholderPolling = payload;
      state.isGettingPolling = false;
    });
    builder.addCase(getStakeholderPolling.pending, (state) => {
      state.isGettingPolling = true;
    });
    builder.addCase(getStakeholderPolling.rejected, (state) => {
      state.isGettingPolling = false;
    });

    builder.addCase(getStakeholderMergingOf.fulfilled, (state, { payload }) => {
      state.stakeholderMergingOf = payload;
      state.isGettingMergingOf = false;
    });
    builder.addCase(getStakeholderMergingOf.pending, (state) => {
      state.isGettingMergingOf = true;
    });
    builder.addCase(getStakeholderMergingOf.rejected, (state) => {
      state.isGettingMergingOf = false;
    });
  },
});

export default stakeholderSlice.reducer;
