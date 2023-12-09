import { Response } from "express";

import { AppError, serverErrorResponse } from "@/utils";

jest.mock("express", () => ({
  ...jest.requireActual("express"),
  Response: jest.fn(),
}));

jest.mock("@/utils/response.util", () => ({
  ...jest.requireActual("@/utils/response.util"),
  response: jest.fn(),
}));

describe("serverErrorResponse", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle AppError and call response with the correct arguments", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    const mockResponse: Partial<Response> = {
      status: mockStatus,
    };

    const fullMockResponse = mockResponse as Response;

    const statusCode = 404;
    const message = "Not Found";
    const appError = new AppError(statusCode, message);
    (
      require("@/utils/response.util").response as jest.Mock
    ).mockImplementationOnce((message, statusCode, res) => {
      res.status(statusCode).json({ message, statusCode });
    });

    serverErrorResponse(appError, fullMockResponse);

    expect(mockStatus).toHaveBeenCalledWith(statusCode);
    expect(mockJson).toHaveBeenCalledWith({
      message,
      status: false,
      statusCode,
      data: null,
      pagination: {},
    });
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("should log the error to console.error for non-AppError errors", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    const mockResponse: Partial<Response> = {
      status: mockStatus,
    };

    const fullMockResponse = mockResponse as Response;

    const statusCode = 500;
    const message = "Internal Server Error";
    const nonAppError = new Error(message);

    serverErrorResponse(nonAppError, fullMockResponse);

    expect(mockStatus).toHaveBeenCalledWith(statusCode);
    expect(mockJson).toHaveBeenCalledWith({
      message,
      status: false,
      statusCode,
      error: nonAppError,
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
