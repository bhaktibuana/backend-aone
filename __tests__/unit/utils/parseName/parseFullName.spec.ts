import { parseFullName } from "@/utils";

describe("parseFullName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should concatenate capitalized first and last names", () => {
    const result = parseFullName("robert", "downey jr.");

    expect(result).toBe("Robert Downey Jr.");
  });

  it("should handle empty first name", () => {
    const result = parseFullName("", "smith");

    expect(result).toBe("Smith");
  });

  it("should handle empty last name", () => {
    const result = parseFullName("john", "");

    expect(result).toBe("John");
  });
});
