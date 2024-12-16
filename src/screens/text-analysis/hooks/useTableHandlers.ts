import { type AppDispatch } from "@/core/rootStore";
import { type IGetDocumentsParams, getDocuments } from "@/store/textanalysis";

export const useTableHandlers = (
  dispatch: AppDispatch,
  getListParams: () => IGetDocumentsParams
) => {
  const onSort = (
    field: string,
    sortField: string,
    sortOrder: string,
    setSort: (field: string, order: string) => void,
    search?: string
  ) => {
    let order = sortOrder === "DESC" ? "ASC" : "DESC";
    if (sortField !== field) {
      order = "ASC";
    }
    const payload = {
      ...getListParams(),
      sortBy: field,
      sortOrder: order,
      search,
    };
    dispatch(getDocuments(payload));
    setSort(field, order);
  };

  const onSearch = (search: string, sortField: string, sortOrder: string) => {
    const payload = { ...getListParams(), search };
    if (sortField) {
      payload.sortBy = sortField;
      payload.sortOrder = sortOrder;
    }
    dispatch(getDocuments(payload));
  };

  return { onSort, onSearch };
};
