import { createAsyncThunk } from "@reduxjs/toolkit";
import { StakeholderSource } from "@/source";
import { IGetParams } from "@/types";

export const getList = createAsyncThunk("stakeholder/getList", async () => {
  return await StakeholderSource.getList();
});

export const getStakeholder = createAsyncThunk(
  "stakeholder/get",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.get(id);
  }
);

export const getStakeholderValues = createAsyncThunk(
  "stakeholder/getValues",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.getValues(id);
  }
);

export const getStakeholderIdentity = createAsyncThunk(
  "stakeholder/getIdentity",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.getIdentity(id);
  }
);

export const getStakeholderDocuments = createAsyncThunk(
  "stakeholder/getDocuments",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.getDocuments(id);
  }
);

export const getStakeholderTranscripts = createAsyncThunk(
  "stakeholder/getTranscripts",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.getTranscripts(id);
  }
);

export const getStakeholderPolling = createAsyncThunk(
  "stakeholder/getPolling",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.getPolling(id);
  }
);

export const getStakeholderMergingOf = createAsyncThunk(
  "stakeholder/getMergingOf",
  async ({ id }: IGetParams) => {
    return await StakeholderSource.getMergingOf(id);
  }
);
