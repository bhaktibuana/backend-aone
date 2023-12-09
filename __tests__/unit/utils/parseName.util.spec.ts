import { capitalizeName, parseFullName } from "@/utils";

describe("capitalizeName", () => {
  it("should capitalize each word in the name", () => {
    const result = capitalizeName("john doe");

    expect(result).toEqual("John Doe");
  });

  it("should handle leading and trailing spaces", () => {
    const result = capitalizeName("   alice    smith   ");

    expect(result).toEqual("Alice Smith");
  });

  it("should handle empty input", () => {
    const result = capitalizeName("");

    expect(result).toEqual("");
  });

  it("should handle input with only spaces", () => {
    const result = capitalizeName("     ");

    expect(result).toEqual("");
  });
});

describe("parseFullName", () => {
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
