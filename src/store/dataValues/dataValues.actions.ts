import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataValuesParams } from "./dataValues.types";
import { DataValuesSource } from "@/source";

export const getValuesList = createAsyncThunk(
  "dataValues/getValuesList",
  async (payload: IDataValuesParams) => {
    return await DataValuesSource.getValuesList(payload);
  }
);
