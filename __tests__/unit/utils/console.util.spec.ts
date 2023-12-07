import { consoleError, consoleLog } from "@/utils";

describe("Console", () => {
  it("Should be able to console error", () => {
    consoleError("Testing Console Error", null);
  });

  it("Should be able to console log", () => {
    consoleLog("Testing Console Log", null);
  });
});
