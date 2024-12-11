import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataValuesParams } from "./dataValues.types";
import { DataValuesSource } from "@/source";

export const getValuesList = createAsyncThunk(
  "dataValues/getValuesList",
  async (payload: IDataValuesParams) => {
    return await DataValuesSource.getValuesList(payload);
  }
);

export const getProfilesList = createAsyncThunk(
  "dataValues/getProfilesList",
  async (payload: IDataValuesParams) => {
    return await DataValuesSource.getProfielsList(payload);
  }
);

export const getValuesHistory = createAsyncThunk(
  "dataValues/getHistory",
  async () => {
    return await DataValuesSource.getHistory();
  }
);
