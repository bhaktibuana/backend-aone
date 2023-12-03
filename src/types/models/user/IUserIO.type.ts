import { Optional } from "sequelize";

import { IUserAttributes } from "@/types/models/user/IUserAttributes.type";

export interface IUserOutput extends Required<IUserAttributes> {}

export interface IUserInput
  extends Optional<
    IUserAttributes,
    | "id"
    | "lastName"
    | "createdAt"
    | "createdBy"
    | "updatedAt"
    | "updatedBy"
    | "deletedAt"
    | "deletedBy"
    | "isVerified"
    | "isActive"
    | "isDeleted"
  > {}
