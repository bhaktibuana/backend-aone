import { Optional } from "sequelize";

import { ILogoutLogAttributes } from "@/types/models/logoutLog/ILogoutLogAttributes.type";

export interface ILogoutLogOutput extends Required<ILogoutLogAttributes> {}

export interface ILogoutLogInput
  extends Optional<
    ILogoutLogAttributes,
    | "id"
    | "createdAt"
    | "createdBy"
    | "updatedAt"
    | "updatedBy"
    | "deletedAt"
    | "deletedBy"
    | "isActive"
    | "isDeleted"
  > {}
