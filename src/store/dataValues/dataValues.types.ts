export interface IDataValuesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface IDataValues {
  id: number;
  value: string;
  mergingOf: string;
  occurredIn: string;
  approvedRatings: number;
  allRatings: number;
  typeLabel: string;
}

export interface IDataValuesResponse {
  content: {
    data: IDataValues[];
    status: string;
  }[];
  totalElements: number;
  pageNumber: number;
}

export interface IProfileCardData {
  id: string;
  title: string;
  status: string;
  value: number;
  approvedRatings: number;
  allRatings: number;
}
