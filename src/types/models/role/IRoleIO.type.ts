import { Optional } from "sequelize";

import { IRoleAttributes } from "@/types/models/role/IRoleAttributes.type";

export interface IRoleOutput extends Required<IRoleAttributes> {}

export interface IRoleInput
  extends Optional<
    IRoleAttributes,
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
