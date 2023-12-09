import fs from "fs";
import path from "path";

import { logOptions } from "@/utils";

jest.mock("moment", () => {
  const mockedMoment = jest.requireActual("moment");
  return () => mockedMoment("2023-12-09T12:00:00.000Z");
});

jest.mock("fs");

describe("logOptions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create log options with the correct file path and stream", () => {
    const mockWriteStream = jest.fn();
    (fs.createWriteStream as jest.Mock).mockReturnValueOnce({
      flags: "a",
      write: mockWriteStream,
    });

    const result = logOptions();

    const expectedLogDir = path.join(process.cwd(), "./logs");
    const expectedLogFilePath = path.join(
      expectedLogDir,
      "logfile-20231209.log"
    );

    expect(fs.existsSync).toHaveBeenCalledWith(expectedLogDir);
    expect(fs.mkdirSync).toHaveBeenCalledWith(expectedLogDir);
    expect(fs.createWriteStream).toHaveBeenCalledWith(expectedLogFilePath, {
      flags: "a",
    });
    expect(result).toEqual({ stream: { flags: "a", write: mockWriteStream } });
  });

  it("should delete old log files", () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (require("fs").readdir as jest.Mock).mockImplementationOnce(
      (logDir, callback) => {
        callback(null, ["logfile-20231109.log", "logfile-20231201.log"]);
      }
    );

    const mockUnlink = jest.fn();
    (require("fs").unlink as jest.Mock).mockImplementationOnce(mockUnlink);

    logOptions();

    expect(fs.readdir).toHaveBeenCalledWith(
      path.join(process.cwd(), "./logs"),
      expect.any(Function)
    );
    expect(mockUnlink).toHaveBeenCalledWith(
      path.join(process.cwd(), "./logs", "logfile-20231109.log"),
      expect.any(Function)
    );
  });

  it("should handle error when delete old log files got error", () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (require("fs").readdir as jest.Mock).mockImplementationOnce(
      (logDir, callback) => {
        callback(null, ["logfile-20231109.log", "logfile-20231201.log"]);
      }
    );

    const unlinkError = new Error("Failed to unlink");
    (require("fs").unlink as jest.Mock).mockImplementationOnce(
      (file, callback) => {
        callback(unlinkError);
      }
    );

    const result = logOptions();

    expect(fs.unlink).toHaveBeenCalledWith(
      path.join(process.cwd(), "./logs", "logfile-20231109.log"),
      expect.any(Function)
    );
    expect(result).toEqual({ stream: undefined });
  });

  it("should handle error when readdir encounters an error", () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    (require("fs").readdir as jest.Mock).mockImplementationOnce(
      (logDir, callback) => {
        const readdirError = new Error("Failed to readdir");
        callback(readdirError, null);
      }
    );

    const result = logOptions();

    expect(fs.readdir).toHaveBeenCalledWith(
      path.join(process.cwd(), "./logs"),
      expect.any(Function)
    );
    expect(result).toEqual({ stream: undefined });
  });
});
