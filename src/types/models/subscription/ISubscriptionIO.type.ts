import { Optional } from "sequelize";

import { ISubscriptionAttributes } from "@/types/models/subscription/ISubscriptionAttributes.type";

export interface ISubscriptionOutput
  extends Required<ISubscriptionAttributes> {}

export interface ISubscriptionInput
  extends Optional<
    ISubscriptionAttributes,
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
