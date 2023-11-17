export interface INextParams {
  offset?: number;
  limit?: number;
}

export interface IPreviousParams {
  offset?: number;
  limit?: number;
}

export interface IResponsePagination {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  perPages?: number;
  nextParams?: INextParams | null;
  previousParams?: IPreviousParams | null;
}
