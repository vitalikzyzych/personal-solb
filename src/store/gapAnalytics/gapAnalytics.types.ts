export interface IGapAnalytics {
  id: string;
  stakeholderName: string;
  community: string;
  rating: number;
  progress: "Safety" | "Missing" | "Solv Generated";
  safety: "Safety" | "Missing" | "Solv Generated";
  network: "Safety" | "Missing" | "Solv Generated";
}
export interface IGapAnalyticsListResponse {
  content: IGapAnalytics[];
  totalElements: number;
  pageNumber: number;
}

export interface IGapAnalyticsAllResponse {
  content: { data: IGapAnalytics[] };
  totalElements: number;
  pageNumber: number;
}

export interface IGapAnalyticsListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}
