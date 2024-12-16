import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetDocumentsParams } from "./textanalysis.types";
import { TextAnalysisSource } from "@/source";

export const getDocuments = createAsyncThunk(
  "textanalysis/getDocuments",
  async (payload: IGetDocumentsParams) => {
    return await TextAnalysisSource.getDocuments(payload);
  }
);
