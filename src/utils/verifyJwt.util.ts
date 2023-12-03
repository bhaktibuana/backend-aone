import jwt from "jsonwebtoken";

import { config } from "@/configs";
import { IVerifyJwt } from "@/types";

export const verifyJwt = (token: string): IVerifyJwt<Object> => {
  let error: IVerifyJwt<Object>["error"] = null;
  let decoded: IVerifyJwt<Object>["decoded"] = {};
  jwt.verify(
    token,
    config.jwtSecretKey,
    { algorithms: ["HS256"] },
    (err, dec) => {
      error = err;
      decoded = dec as jwt.JwtPayload;
    }
  );
  return { error, decoded };
};
