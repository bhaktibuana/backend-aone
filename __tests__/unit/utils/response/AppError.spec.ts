import { AppError } from "@/utils";

describe("AppError", () => {
  it("should create an instance of AppError with statusCode and message", () => {
    const statusCode = 404;
    const message = "Not Found";

    const appError = new AppError(statusCode, message);

    expect(appError).toBeInstanceOf(Error);
    expect(appError).toBeInstanceOf(AppError);

    expect(appError.statusCode).toBe(statusCode);
    expect(appError.message).toBe(message);
    expect(appError.name).toBe("AppError");
  });

  it("should create an instance of AppError with default status code and message", () => {
    const statusCode = undefined;
    const message = "";

    const appError = new AppError(statusCode as never as number, message);

    expect(appError).toBeInstanceOf(Error);
    expect(appError).toBeInstanceOf(AppError);

    expect(appError.statusCode).toBeUndefined();
    expect(appError.message).toBe("");
    expect(appError.name).toBe("AppError");
  });

  it("should capture stack trace", () => {
    const statusCode = 404;
    const message = "Not Found";

    const appError = new AppError(statusCode, message);

    expect(appError.stack).toBeDefined();
  });
});
