import { Response } from "express";
import { consoleError } from "@/utils/console.util";
import { IResponsePagination, IResponse, IErrorResponse } from "@/types";

export const response = <T>(
  message: string,
  statusCode: number,
  res: Response,
  data: T | null = null,
  pagination: IResponsePagination = {}
): void => {
  const httpResponse: IResponse<T> = {
    message,
    status: statusCode >= 200 && statusCode < 300,
    statusCode,
    data,
    pagination,
  };
  res.status(statusCode).json(httpResponse);
};

export const serverErrorResponse = (error: Error, res: Response): void => {
  consoleError("Internal Server Error:", error);

  const errorResponse: IErrorResponse = {
    message: "Internal Server Error",
    status: false,
    statusCode: 500,
    error,
  };

  res.status(500).json(errorResponse);
};
