import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { ISubscriptionAttributes, ISubscriptionInput } from "@/types";

export class Subscription
  extends Model<ISubscriptionAttributes, ISubscriptionInput>
  implements ISubscriptionAttributes
{
  public id!: number;
  public code!: string;
  public name!: string;
  public price!: number;
  public createdAt!: Date;
  public createdBy!: string;
  public updatedAt!: Date;
  public updatedBy!: string;
  public deletedAt!: Date;
  public deletedBy!: string;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Subscription",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
