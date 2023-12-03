import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { ILoginLogAttributes, ILoginLogInput } from "@/types";

export class LoginLog
  extends Model<ILoginLogAttributes, ILoginLogInput>
  implements ILoginLogAttributes
{
  public id!: number;
  public userId!: number;
  public ipAddress!: string;
  public userAgent!: string;
  public device!: string;
  public loginAt!: Date;
  public otpToken!: string;
  public createdAt!: Date;
  public createdBy!: string;
  public updatedAt!: Date;
  public updatedBy!: string;
  public deletedAt!: Date | null;
  public deletedBy!: string | null;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

LoginLog.init(
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
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    device: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    loginAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    otpToken: {
      type: DataTypes.STRING(255),
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
    tableName: "LoginLog",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
