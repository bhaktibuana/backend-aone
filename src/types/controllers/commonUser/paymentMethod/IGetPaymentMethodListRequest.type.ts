export interface IGetPaymentMethodListRequest {
  query: {
    perPage?: string;
    page?: string;
    sortAsc?: string;
    sortDesc?: string;
    search?: string;
  };
}
