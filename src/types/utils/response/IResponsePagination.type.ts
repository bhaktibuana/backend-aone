export interface INextParams {
  offset?: number;
  limit?: number;
}

export interface IPreviousParams {
  offset?: number;
  limit?: number;
}

export interface IResponsePagination {
  totalItems?: number;
  totalPages?: number;
  perPage?: number;
  currentPage?: number;
  nextPage?: number | null;
  previousPage?: number | null;
}
