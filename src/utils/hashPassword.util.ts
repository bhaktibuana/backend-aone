import crypto from "crypto";

export const hashPassword = (password: string): string => {
  const salt = "p@5s.@0n3";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};