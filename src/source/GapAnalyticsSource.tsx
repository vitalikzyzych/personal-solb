import { IGapAnalyticsListParams } from "@/store/gapAnalytics";
import { generateRecords } from "@/utils/values/gapAnalytics";

export const getListAll = async (payload: IGapAnalyticsListParams) => {
  return {
    content: generateRecords(50),
    totalElements: 50,
    pageNumber: payload.page || 1,
  };
};

export const getList = async (payload: IGapAnalyticsListParams) => {
  return {
    content: generateRecords(20),
    totalElements: 50,
    pageNumber: payload.page || 1,
  };
};
