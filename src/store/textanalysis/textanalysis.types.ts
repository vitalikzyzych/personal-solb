export interface IGetDocumentsParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IAnalyzedData {
  state: string;
  count: number | null;
}

export interface ISelectedData {
  name: string;
  privacyStatus: string;
  uploadDate: string;
  fileCategory: string;
  analyzed: IAnalyzedData;
}

export interface ISelectedDataResponse {
  content: ISelectedData[];
  totalElements: number;
  pageNumber: number;
}

export interface IReviewValue {
  id: number;
  name: string;
  occurredIn: string[];
  ratings: number;
  rejected: boolean;
}
export interface IReviewStakeholder {
  id: number;
  name: string;
  occurredIn: string[];
  ratings: number;
  affiliation: string;
  rejected: boolean;
}

export enum ContentKeys {
  STAKEHOLDERS_NEW = "stakeholders_new",
  STAKEHOLDERS_EXISTING = "stakeholders_existing",
  VALUES_NEW = "values_new",
  VALUES_EXISTING = "values_existing",
}
