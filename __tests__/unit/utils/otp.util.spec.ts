import { generateOtp, verifyOtp, generateJwt } from "@/utils";

describe("OTP", () => {
  it("Should be able to generate OTP (4 characters)", () => {
    const { otp } = generateOtp();
    expect((otp as string).length).toBe(4);
  });

  it("Should be able to generate string", () => {
    const { otp } = generateOtp();
    expect(typeof otp).toBe("string");
  });

  it("Should be able to verify OTP", () => {
    const { otp, otpToken } = generateOtp();
    const response = verifyOtp(otp as string, otpToken);
    expect(response).toEqual({
      verified: true,
      message: "OTP verified",
    });
  });

  it("Should error if has wrong OTP", () => {
    const { otpToken } = generateOtp();
    const response = verifyOtp("@2923", otpToken);
    expect(response).toEqual({
      verified: false,
      message: "Wrong OTP",
    });
  });

  it("Should error if has invalid token", () => {
    const { otp } = generateOtp();
    const response = verifyOtp(otp as string, "oqiuwhfbi2u3b123");
    expect(response).toEqual({
      verified: false,
      message: "Invalid token",
    });
  });

  it("Should error if token expired", () => {
    const pastTimestamp = Math.floor(Date.now() / 1000) - 10;
    const { otp } = generateOtp();
    const otpToken = generateJwt(
      {
        otp,
      },
      "-1s"
    );

    const response = verifyOtp(otp as string, otpToken);
    expect(response).toEqual({
      verified: false,
      message: "OTP expired",
    });
  });
});
