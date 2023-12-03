export interface IVerifyOtp {
  verified: boolean;
  message: "OTP verified" | "Wrong OTP" | "OTP expired" | "Invalid token";
}
