import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { IUserSubscriptionAttributes, IUserSubscriptionInput } from "@/types";

export class UserSubscription
  extends Model<IUserSubscriptionAttributes, IUserSubscriptionInput>
  implements IUserSubscriptionAttributes
{
  public id!: number;
  public userId!: number;
  public subscriptionId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public isActive!: boolean;
}

UserSubscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "UserSubscription",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
