import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { IUserLoginAttributes, IUserLoginInput } from "@/types";

export class UserLogin
  extends Model<IUserLoginAttributes, IUserLoginInput>
  implements IUserLoginAttributes
{
  public id!: number;
  public userId!: number;
  public ipAddress!: string | null;
  public userAgent!: string | null;
  public device!: string | null;
  public otpToken!: string | null;
  public createdAt!: Date;
  public createdBy!: string;
  public updatedAt!: Date;
  public updatedBy!: string;
  public deletedAt!: Date | null;
  public deletedBy!: string | null;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

UserLogin.init(
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
    ipAddress: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    otpToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    tableName: "UserLogin",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
