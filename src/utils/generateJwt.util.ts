import jwt, { SignOptions } from "jsonwebtoken";

import { config } from "@/configs";
import { TJwtPayload } from "@/types";

export const generateJwt = (
  payload: TJwtPayload,
  expiresIn?: SignOptions["expiresIn"]
): string => {
  return expiresIn
    ? jwt.sign(payload, config.jwtSecretKey, {
        algorithm: "HS256",
        expiresIn,
      } as SignOptions)
    : jwt.sign(payload, config.jwtSecretKey, {
        algorithm: "HS256",
      } as SignOptions);
};
