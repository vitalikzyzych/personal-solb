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

export interface IHistoryItem {
  id: string;
  type: "value" | "stakeholder";
  action: "approval" | "failed_approval" | "merge" | "disapproval";
  values: string[];
  sourceValue?: string; // Optional for "merge" action
  comments?: IHistoryItemComment[];
  timestamp: string;
}

export interface IHistoryItemComment {
  id: string;
  text: string;
  timestamp: string;
}
