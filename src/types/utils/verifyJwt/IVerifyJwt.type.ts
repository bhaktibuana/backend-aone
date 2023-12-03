import { JwtPayload, VerifyErrors } from "jsonwebtoken";

export interface IVerifyJwt<T> {
  error: VerifyErrors | null;
  decoded: JwtPayload & T;
}
