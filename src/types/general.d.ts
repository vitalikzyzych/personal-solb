export interface PaginatorMeta {
  page: number;
  total: number;
  pageSize: number;
}

export interface ListResponse<T> {
  totalElements: number;
  content: Array<T>;
  pageable: {
    pageNumber: number;
  };
}
