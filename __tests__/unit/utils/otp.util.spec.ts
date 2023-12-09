import { generateOtp, verifyOtp } from "@/utils";

import { TGenerateOtp, IVerifyOtp, TOtpToken } from "@/types";

jest.mock("otp-generator", () => ({
  generate: jest.fn(),
}));

jest.mock("@/utils/generateJwt.util", () => ({
  generateJwt: jest.fn(),
}));

jest.mock("@/utils/verifyJwt.util", () => ({
  verifyJwt: jest.fn(),
}));

describe("generateOtp", () => {
  beforeEach(() => {
    const validPayload: TOtpToken = {
      error: null,
      decoded: { otp: "1234" },
    };

    (require("otp-generator").generate as jest.Mock).mockReturnValue("1234");

    (
      require("@/utils/generateJwt.util").generateJwt as jest.Mock
    ).mockReturnValue("mockedJwtToken");

    (require("@/utils/verifyJwt.util").verifyJwt as jest.Mock).mockReturnValue(
      validPayload
    );
  });

  it("should generate OTP and return decoded information", () => {
    const result: TGenerateOtp = generateOtp();
    expect(result).toEqual({
      otp: "1234",
      otpToken: "mockedJwtToken",
    });
  });

  it("Should be able to generate String", () => {
    const result: TGenerateOtp = generateOtp();
    expect(typeof result.otp).toBe("string");
  });

  it("Should generate OTP (4 characters)", () => {
    const result: TGenerateOtp = generateOtp();
    expect((result.otp as string).length).toBe(4);
  });
});

jest.mock("@/utils/verifyJwt.util", () => ({
  verifyJwt: jest.fn(),
}));

describe("verifyOtp", () => {
  beforeAll;
  it("should return 'OTP verified' for a valid OTP", () => {
    const validPayload: TOtpToken = {
      error: null,
      decoded: { otp: "1234" },
    };
    (require("@/utils/verifyJwt.util").verifyJwt as jest.Mock).mockReturnValue(
      validPayload
    );

    const result: IVerifyOtp = verifyOtp("1234", "validToken");

    expect(result).toEqual({
      verified: true,
      message: "OTP verified",
    });
  });

  it("should return 'Invalid token' for an invalid token", () => {
    const invalidPayload: TOtpToken = {
      error: { name: "" } as TOtpToken["error"],
      decoded: {},
    };
    (require("@/utils/verifyJwt.util").verifyJwt as jest.Mock).mockReturnValue(
      invalidPayload
    );

    const result: IVerifyOtp = verifyOtp("1234", "invalidToken");

    expect(result).toEqual({
      verified: false,
      message: "Invalid token",
    });
  });

  it("should return 'OTP expired' for an expired token", () => {
    const expiredPayload: TOtpToken = {
      error: { name: "TokenExpiredError" } as TOtpToken["error"],
      decoded: {},
    };
    (require("@/utils/verifyJwt.util").verifyJwt as jest.Mock).mockReturnValue(
      expiredPayload
    );

    const result: IVerifyOtp = verifyOtp("1234", "expiredToken");

    expect(result).toEqual({
      verified: false,
      message: "OTP expired",
    });
  });

  it("should return 'Wrong OTP' for a wrong OTP", () => {
    const validPayload: TOtpToken = {
      error: null,
      decoded: { otp: "4321" },
    };
    (require("@/utils/verifyJwt.util").verifyJwt as jest.Mock).mockReturnValue(
      validPayload
    );

    const result: IVerifyOtp = verifyOtp("1234", "validToken");

    expect(result).toEqual({
      verified: false,
      message: "Wrong OTP",
    });
  });
});
