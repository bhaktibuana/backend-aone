import { Response } from "express";

import { response } from "@/utils";
import { IResponsePagination } from "@/types";

jest.mock("express", () => ({
  ...jest.requireActual("express"),
  Response: jest.fn(),
}));

describe("response", () => {
  it("should send a successful response with data", () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    const mockResponse: Partial<Response> = {
      status: mockStatus,
    };

    const fullMockResponse = mockResponse as Response;

    const message = "Success message";
    const statusCode = 200;
    const data = { key: "value" };
    const pagination: IResponsePagination = {
      currentPage: 1,
      totalPages: 10,
      totalItems: 100,
      perPages: 10,
      nextParams: {
        offset: 10,
        limit: 0,
      },
      previousParams: null,
    };

    response(message, statusCode, fullMockResponse, data, pagination);

    expect(mockStatus).toHaveBeenCalledWith(statusCode);
    expect(mockJson).toHaveBeenCalledWith({
      message,
      status: true,
      statusCode,
      data,
      pagination,
    });
  });
});
