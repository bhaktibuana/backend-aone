import { Op, Sequelize } from "sequelize";

import { IModels } from "@/types";
import { sequelize } from "@/models/connection";
import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";
import { Subscription } from "@/models/subscription.model";
import { UserSubscription } from "@/models/userSubscription.model";
import { UserCard } from "@/models/userCard.model";
import { UserLogin } from "@/models/userLogin.model";
import { LoginLog } from "@/models/loginLog.model";
import { LogoutLog } from "@/models/logoutLog.model";

export class Model {
  constructor() {
    this.Op = Op;
    this.sequelize = sequelize;
    this.models = {
      Role,
      User,
      Subscription,
      UserSubscription,
      UserCard,
      UserLogin,
      LoginLog,
      LogoutLog,
    };
  }

  public Op: typeof Op;
  public sequelize: Sequelize;
  public models: IModels;
}

class ModelAssociate extends Model {
  constructor() {
    super();
    this.associate();
  }

  private associate(): void {
    this.userAsc();
    this.subscriptionAsc();
    this.userSubscriptionAsc();
    this.loginLogAsc();
  }

  private userAsc(): void {
    User.belongsTo(Role, {
      as: "Role",
      foreignKey: "roleId",
    });
    User.hasMany(UserSubscription, {
      as: "UserSubscription",
      foreignKey: "userId",
    });
    User.hasMany(UserCard, {
      as: "UserCard",
      foreignKey: "userId",
    });
    User.hasOne(UserLogin, {
      as: "UserLogin",
      foreignKey: "userId",
    });
    User.hasMany(LoginLog, {
      as: "LoginLog",
      foreignKey: "userId",
    });
  }

  private subscriptionAsc(): void {
    Subscription.hasMany(UserSubscription, {
      as: "UserSubscription",
      foreignKey: "subscriptionId",
    });
  }

  private userSubscriptionAsc(): void {
    UserSubscription.belongsTo(User, {
      as: "User",
      foreignKey: "userId",
    });
    UserSubscription.belongsTo(Subscription, {
      as: "Subscription",
      foreignKey: "subscriptionId",
    });
  }

  private loginLogAsc(): void {
    LoginLog.hasOne(LogoutLog, {
      as: "LogoutLog",
      foreignKey: "loginLogId",
    });
  }
}

new ModelAssociate();
