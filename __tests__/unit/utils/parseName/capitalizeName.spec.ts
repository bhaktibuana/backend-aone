import { capitalizeName } from "@/utils";

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
