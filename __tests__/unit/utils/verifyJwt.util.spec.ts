import { generateJwt, verifyJwt } from "@/utils";

describe("Verify JWT", () => {
  const dummy = { name: "John" };

  it("Should be able to decode JWT", () => {
    const token = generateJwt(dummy);
    const { decoded } = verifyJwt(token);
    expect(decoded).toHaveProperty("name");
  });

  it("Should error if invalid token", () => {
    const { error } = verifyJwt("asdoiqjdiwqqd");
    expect(error).toHaveProperty("name");
  });

  it("Should error if token expired", () => {
    const token = generateJwt(dummy, "-1s");
    const { error } = verifyJwt(token);
    expect(error?.name).toBe("TokenExpiredError");
  });
});
