import { hashPassword } from "@/utils";

describe("Hash Password", () => {
  it("Should be able to hash a password", () => {
    const password = "12345678910";
    expect(typeof hashPassword(password)).toBe("string");
    expect(hashPassword(password)).not.toBe(password);
  });
});
