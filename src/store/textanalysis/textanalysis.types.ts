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
