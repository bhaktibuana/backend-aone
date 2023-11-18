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

export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const serverErrorResponse = (error: any, res: Response): void => {
  if (error instanceof AppError) {
    response(error.message, error.statusCode, res);
  } else {
    consoleError("Internal Server Error:", error);

    const errorResponse: IErrorResponse = {
      message: "Internal Server Error",
      status: false,
      statusCode: 500,
      error,
    };

    res.status(500).json(errorResponse);
  }
};
