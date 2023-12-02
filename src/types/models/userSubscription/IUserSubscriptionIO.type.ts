import { Optional } from "sequelize";

import { IUserSubscriptionAttributes } from "@/types/models/userSubscription/IUserSubscriptionAttributes.type";

export interface IUserSubscriptionOutput
  extends Required<IUserSubscriptionAttributes> {}

export interface IUserSubscriptionInput
  extends Optional<IUserSubscriptionAttributes, "id" | "isActive"> {}
