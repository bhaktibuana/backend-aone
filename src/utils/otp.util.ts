import otpGenerator from "otp-generator";

import { generateJwt, verifyJwt } from "@/utils";
import { TGenerateOtp, TOtpToken, IVerifyOtp } from "@/types";

const otpLength = 4;

export const generateOtp = (): TGenerateOtp => {
  const otp = otpGenerator.generate(otpLength, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otpToken = generateJwt({ otp }, "120s");
  const { decoded }: TOtpToken = verifyJwt(otpToken);
  return { ...decoded, otpToken };
};

export const verifyOtp = (otp: string, otpToken: string): IVerifyOtp => {
  let response: IVerifyOtp = {} as IVerifyOtp;

  const { error, decoded }: TOtpToken = verifyJwt(otpToken);

  if (error && error.name === "TokenExpiredError") {
    response = {
      verified: false,
      message: "OTP expired",
    };
  } else if (error) {
    response = {
      verified: false,
      message: "Invalid token",
    };
  } else {
    if (decoded.otp === otp) {
      response = {
        verified: true,
        message: "OTP verified",
      };
    } else {
      response = {
        verified: false,
        message: "Wrong OTP",
      };
    }
  }
  return response;
};
