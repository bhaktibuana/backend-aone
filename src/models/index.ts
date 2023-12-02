import { Op, Sequelize } from "sequelize";

import { IModels } from "@/types";
import { sequelize } from "@/models/connection";
import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";
import { Subscription } from "@/models/subscription.model";
import { UserSubscription } from "@/models/userSubscription.model";
import { UserCard } from "@/models/userCard.model";

export class Model {
  constructor() {
    this.associate();
    this.Op = Op;
    this.sequelize = sequelize;
    this.models = {
      Role,
      User,
      Subscription,
      UserSubscription,
      UserCard,
    };
  }

  public Op: typeof Op;
  public sequelize: Sequelize;
  public models: IModels;

  private associate(): void {
    this.userAsc();
    this.subscriptionAsc();
    this.userSubscriptionAsc();
  }

  private userAsc(): void {
    User.belongsTo(Role, {
      foreignKey: "roleId",
    });
    User.hasMany(UserSubscription, {
      foreignKey: "userId",
    });
    User.hasMany(UserCard, {
      foreignKey: "userId",
    });
  }

  private subscriptionAsc(): void {
    Subscription.hasMany(UserSubscription, {
      foreignKey: "subscriptionId",
    });
  }

  private userSubscriptionAsc(): void {
    UserSubscription.belongsTo(User, {
      foreignKey: "userId",
    });
    UserSubscription.belongsTo(Subscription, {
      foreignKey: "subscriptionId",
    });
  }
}
