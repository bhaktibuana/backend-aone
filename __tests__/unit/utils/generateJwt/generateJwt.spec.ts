import { generateJwt } from "@/utils";

jest.mock("jsonwebtoken");

jest.mock("@/configs/app.config", () => ({
  config: {
    jwtSecretKey: "mockedSecretKey",
  },
}));

describe("generateJwt", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate a JWT with payload and expiration", () => {
    const mockPayload = { userId: 123, role: "user" };
    const mockExpiresIn = "1h";
    const mockGeneratedJwt = "mockedJwtToken";

    (require("jsonwebtoken").sign as jest.Mock).mockReturnValue(
      mockGeneratedJwt
    );

    const result = generateJwt(mockPayload, mockExpiresIn);

    expect(result).toEqual(mockGeneratedJwt);
    expect(require("jsonwebtoken").sign).toHaveBeenCalledWith(
      mockPayload,
      require("@/configs/app.config").config.jwtSecretKey,
      {
        algorithm: "HS256",
        expiresIn: mockExpiresIn,
      }
    );
  });

  it("should generate a JWT with payload and without expiration", () => {
    const mockPayload = { userId: 123, role: "user" };
    const mockGeneratedJwt = "mockedJwtToken";

    (require("jsonwebtoken").sign as jest.Mock).mockReturnValue(
      mockGeneratedJwt
    );

    const result = generateJwt(mockPayload);

    expect(result).toEqual(mockGeneratedJwt);
    expect(require("jsonwebtoken").sign).toHaveBeenCalledWith(
      mockPayload,
      require("@/configs/app.config").config.jwtSecretKey,
      {
        algorithm: "HS256",
      }
    );
  });
});
