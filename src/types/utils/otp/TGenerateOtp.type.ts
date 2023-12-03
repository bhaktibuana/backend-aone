import { IVerifyJwt } from "@/types";

export type TOtpToken = IVerifyJwt<{ otp?: string }>;

export type TGenerateOtp = TOtpToken["decoded"] & {
  otpToken: string;
};
