import { generateJwt, verifyJwt } from "@/utils";

describe("Generate JWT", () => {
  const dummy = { name: "John" };

  it("Should be able to generate JWT", () => {
    const token = generateJwt(dummy);
    expect(token).not.toBe("");
  });

  it("Token should be a string", () => {
    const token = generateJwt(dummy);
    expect(typeof token).toBe("string");
  });

  it("Should be able to set JWT expiration", () => {
    const token = generateJwt(dummy, "5s");
    const { decoded } = verifyJwt(token);
    expect(decoded).toHaveProperty("exp");
  });
});
