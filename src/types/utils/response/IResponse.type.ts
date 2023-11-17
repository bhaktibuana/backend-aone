import { IResponsePagination } from "@/types/utils/response/IResponsePagination.type";

export interface IResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  data: T | null;
  pagination: IResponsePagination | {};
}
