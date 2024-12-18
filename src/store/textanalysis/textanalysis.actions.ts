import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetDocumentsParams } from "./textanalysis.types";
import { TextAnalysisSource } from "@/source";

export const getDocuments = createAsyncThunk(
  "textanalysis/getDocuments",
  async (payload: IGetDocumentsParams) => {
    return await TextAnalysisSource.getDocuments(payload);
  }
);

export const getReviewValues = createAsyncThunk(
  "textanalysis/getReviewValues",
  async (payload: IGetDocumentsParams) => {
    return await TextAnalysisSource.getReviewValues(payload);
  }
);

export const getReviewStakeholders = createAsyncThunk(
  "textanalysis/getReviewStakeholders",
  async (payload: IGetDocumentsParams) => {
    return await TextAnalysisSource.getReviewStakeholders(payload);
  }
);
