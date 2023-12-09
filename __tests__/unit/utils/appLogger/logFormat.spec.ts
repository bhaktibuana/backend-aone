import { Request, Response } from "express";
import { logFormat } from "@/utils";

jest.mock("express", () => ({
  ...jest.requireActual("express"),
  Request: jest.fn(),
  Response: jest.fn(),
}));

describe("logFormat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should format the log string correctly", () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      locals: {
        device: {
          client: { name: "Browser" },
          os: { name: "Android" },
          device: {
            brand: "Samsung",
            model: "Galaxy S20",
            type: "smartphone",
          },
        },
      },
    };

    const fullMockResponse = mockResponse as Response;
    const fullMockRequest = mockRequest as Request;

    const tokens = {
      date: jest.fn().mockReturnValue("2023-12-09T12:00:00.000Z"),
      method: jest.fn().mockReturnValue("GET"),
      url: jest.fn().mockReturnValue("/example"),
      "http-version": jest.fn().mockReturnValue("1.1"),
      "response-time": jest.fn().mockReturnValue("50"),
      "remote-addr": jest.fn().mockReturnValue("127.0.0.1"),
      "user-agent": jest.fn().mockReturnValue("Test User Agent"),
      status: jest.fn().mockReturnValue("200"),
      res: jest.fn().mockReturnValue("1024"),
    };

    const logString = logFormat(tokens, fullMockRequest, fullMockResponse);

    const expectedLogString =
      '[2023-12-09T12:00:00.000Z] "GET /example HTTP/1.1" 200 1024 - 50ms 127.0.0.1 "Test User Agent" Samsung Galaxy S20';
    expect(logString).toBe(expectedLogString);

    expect(tokens.date).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse,
      "web"
    );
    expect(tokens.method).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse
    );
    expect(tokens.url).toHaveBeenCalledWith(fullMockRequest, fullMockResponse);
    expect(tokens["http-version"]).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse
    );
    expect(tokens["response-time"]).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse
    );
    expect(tokens["remote-addr"]).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse
    );
    expect(tokens["user-agent"]).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse
    );
    expect(tokens.status).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse
    );
    expect(tokens.res).toHaveBeenCalledWith(
      fullMockRequest,
      fullMockResponse,
      "content-length"
    );
  });
});
