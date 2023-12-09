import { consoleError } from "@/utils";

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
    const mockTitle = "Error";
    const mockPayload = { key: "value" };

    consoleError(mockTitle, mockPayload);

    expect(mockConsoleError).toHaveBeenCalledWith(
      `[${mockTitle}] =>`,
      mockPayload
    );
  });
});
