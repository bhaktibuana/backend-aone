import { verifyJwt } from "@/utils";
import { IVerifyJwt } from "@/types";

jest.mock("jsonwebtoken");

jest.mock("@/configs/app.config", () => ({
  config: {
    jwtSecretKey: "mockedSecretKey",
  },
}));

describe("verifyJwt", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return decoded payload for a valid token", () => {
    const mockToken = "validToken";
    const mockDecodedPayload = { userId: 123, role: "user" };

    (require("jsonwebtoken").verify as jest.Mock).mockImplementation(
      (token, secret, options, callback) => {
        callback(null, mockDecodedPayload);
      }
    );

    const result: IVerifyJwt<Object> = verifyJwt(mockToken);

    expect(result).toEqual({ error: null, decoded: mockDecodedPayload });
    expect(require("jsonwebtoken").verify).toHaveBeenCalledWith(
      mockToken,
      require("@/configs/app.config").config.jwtSecretKey,
      { algorithms: ["HS256"] },
      expect.any(Function)
    );
  });

  it("should return an error for an invalid token", () => {
    const mockToken = "invalidToken";
    const mockError = new Error("Token verification failed");

    (require("jsonwebtoken").verify as jest.Mock).mockImplementation(
      (token, secret, options, callback) => {
        callback(mockError, null);
      }
    );

    const result: IVerifyJwt<Object> = verifyJwt(mockToken);

    expect(result).toEqual({ error: mockError, decoded: null });
    expect(require("jsonwebtoken").verify).toHaveBeenCalledWith(
      mockToken,
      require("@/configs/app.config").config.jwtSecretKey,
      { algorithms: ["HS256"] },
      expect.any(Function)
    );
  });
});
