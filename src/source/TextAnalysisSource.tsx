import { type IGetDocumentsParams } from "@/store/textanalysis";
import { generateTableData } from "@/utils/values/textanalysis";

export const getDocuments = async (payload: IGetDocumentsParams) => {
  return {
    content: generateTableData(),
    totalElements: 50,
    pageNumber: payload.page || 1,
  };
};
