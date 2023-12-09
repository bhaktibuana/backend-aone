import { consoleError, consoleLog } from "@/utils";

jest.mock("@/configs/app.config", () => {
  const originalConfig = jest.requireActual("@/configs/app.config");

  return {
    __esModule: true,
    ...originalConfig,
    config: {
      nodeEnv: originalConfig.config.nodeEnv,
    },
  };
});

const mockConfig = jest.requireMock("@/configs/app.config");

describe("consoleLog", () => {
  let mockConsoleLog: jest.SpyInstance;

  beforeAll(() => {
    mockConsoleLog = jest.spyOn(global.console, "log").mockImplementation();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  it("should log to the console in development environment", () => {
    mockConfig.config.nodeEnv = "development";

    const mockTitle = "Test Title";
    const mockPayload = { key: "value" };

    consoleLog(mockTitle, mockPayload);

    expect(mockConsoleLog).toHaveBeenCalledWith(
      `[${mockTitle}] =>`,
      mockPayload
    );
  });

  it("should not log to the console in production environment", () => {
    mockConfig.config.nodeEnv = "production";

    const mockTitle = "Test Title";
    const mockPayload = { key: "value" };

    consoleLog(mockTitle, mockPayload);

    expect(mockConsoleLog).not.toHaveBeenCalled();
  });
});

describe("consoleError", () => {
  let mockConsoleError: jest.SpyInstance;

  beforeAll(() => {
    mockConsoleError = jest.spyOn(global.console, "error").mockImplementation();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  beforeEach(() => {
    mockConsoleError.mockClear();
  });

  it("should error to the console", () => {
    mockConfig.config.nodeEnv = "development";

    const mockTitle = "Error";
    const mockPayload = { key: "value" };

    consoleError(mockTitle, mockPayload);

    expect(mockConsoleError).toHaveBeenCalledWith(
      `[${mockTitle}] =>`,
      mockPayload
    );
  });
});
