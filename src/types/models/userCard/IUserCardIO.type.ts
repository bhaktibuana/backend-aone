import { Optional } from "sequelize";

import { IUserCardAttributes } from "@/types/models/userCard/IUserCardAttributes.type";

export interface IUserCardOutput extends Required<IUserCardAttributes> {}

export interface IUserCardInput
  extends Optional<
    IUserCardAttributes,
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
