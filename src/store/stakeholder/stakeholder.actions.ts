import { createAsyncThunk } from "@reduxjs/toolkit";
import { DataValuesSource, StakeholderSource } from "@/source";
import { IGetParams } from "@/types";
import { IStakeholderListParams } from "./stakeholder.types";

export const getListAll = createAsyncThunk(
  "stakeholder/getListAll",
  async (payload: IStakeholderListParams) => {
    return await StakeholderSource.getListAll(payload);
  }
);

export const getList = createAsyncThunk(
  "stakeholder/getList",
  async (payload: IStakeholderListParams) => {
    return await StakeholderSource.getList(payload);
  }
);

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
