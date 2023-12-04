import { Optional } from "sequelize";

import { ILoginLogAttributes } from "@/types/models/loginLog/ILoginLogAttributes.type";

export interface ILoginLogOutput extends Required<ILoginLogAttributes> {}

export interface ILoginLogInput
  extends Optional<
    ILoginLogAttributes,
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
