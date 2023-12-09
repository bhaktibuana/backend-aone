import { verifyOtp } from "@/utils";

import { IVerifyOtp, TOtpToken } from "@/types";

jest.mock("@/utils/verifyJwt.util", () => ({
  verifyJwt: jest.fn(),
}));

describe("verifyOtp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
