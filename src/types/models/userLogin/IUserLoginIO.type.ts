import { Optional } from "sequelize";

import { IUserLoginAttributes } from "@/types/models/userLogin/IUserLoginAttributes.type";

export interface IUserLoginOutput extends Required<IUserLoginAttributes> {}

export interface IUserLoginInput
  extends Optional<
    IUserLoginAttributes,
    | "id"
    | "ipAddress"
    | "userAgent"
    | "device"
    | "otpToken"
    | "createdAt"
    | "createdBy"
    | "updatedAt"
    | "updatedBy"
    | "deletedAt"
    | "deletedBy"
    | "isActive"
    | "isDeleted"
  > {}
