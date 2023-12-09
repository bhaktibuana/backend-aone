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

    // Mock the jwt.verify function to return an error
    (require("jsonwebtoken").verify as jest.Mock).mockImplementation(
      (token, secret, options, callback) => {
        callback(mockError, null);
      }
    );

    // Call the verifyJwt function
    const result: IVerifyJwt<Object> = verifyJwt(mockToken);

    // Assertions
    expect(result).toEqual({ error: mockError, decoded: null });
    // Optionally, you can assert that jwt.verify was called with the expected parameters
    expect(require("jsonwebtoken").verify).toHaveBeenCalledWith(
      mockToken,
      require("@/configs/app.config").config.jwtSecretKey,
      { algorithms: ["HS256"] },
      expect.any(Function)
    );
  });
});

// import { generateJwt, verifyJwt } from "@/utils";

// describe("Verify JWT", () => {
//   const dummy = { name: "John" };

//   it("Should be able to decode JWT", () => {
//     const token = generateJwt(dummy);
//     const { decoded } = verifyJwt(token);
//     expect(decoded).toHaveProperty("name");
//   });

//   it("Should error if invalid token", () => {
//     const { error } = verifyJwt("asdoiqjdiwqqd");
//     expect(error).toHaveProperty("name");
//   });

//   it("Should error if token expired", () => {
//     const token = generateJwt(dummy, "-1s");
//     const { error } = verifyJwt(token);
//     expect(error?.name).toBe("TokenExpiredError");
//   });
// });
