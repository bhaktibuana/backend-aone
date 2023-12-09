import { generateOtp } from "@/utils";

import { TGenerateOtp, TOtpToken } from "@/types";

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
