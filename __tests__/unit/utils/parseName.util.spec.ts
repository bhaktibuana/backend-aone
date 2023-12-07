import { capitalizeName, parseFullName } from "@/utils";

describe("Parse Name", () => {
  it("Should be able to capitalize a name", () => {
    const name = "john doe";
    const capitalized = capitalizeName(name);
    expect(capitalized).toBe("John Doe");
  });

  it("Should return empty string if there is no name", () => {
    const name = "";
    const capitalized = capitalizeName(name);
    expect(capitalized).toBe("");
  });

  it("Should be able to join first name and last name", () => {
    const firstName = "Peter";
    const lastName = "Paul Walker";
    const parsedName = parseFullName(firstName, lastName);
    expect(parsedName).toBe("Peter Paul Walker");
  });

  it("Should be able show first name only if last name is empty", () => {
    const firstName = "Peter";
    const lastName = "";
    const parsedName = parseFullName(firstName, lastName);
    expect(parsedName).toBe("Peter");
  });

  it("Should be able show last name only if first name is empty", () => {
    const firstName = "";
    const lastName = "Paul Walker";
    const parsedName = parseFullName(firstName, lastName);
    expect(parsedName).toBe("Paul Walker");
  });
});
