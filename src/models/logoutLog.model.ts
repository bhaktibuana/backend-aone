import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { ILogoutLogAttributes, ILogoutLogInput } from "@/types";

export class LogoutLog
  extends Model<ILogoutLogAttributes, ILogoutLogInput>
  implements ILogoutLogAttributes
{
  public id!: number;
  public loginLogId!: number;
  public ipAddress!: string;
  public userAgent!: string;
  public device!: string;
  public logoutAt!: Date;
  public createdAt!: Date;
  public createdBy!: number;
  public updatedAt!: Date | null;
  public updatedBy!: number | null;
  public deletedAt!: Date | null;
  public deletedBy!: number | null;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

LogoutLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    loginLogId: {
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
    logoutAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("NOW()"),
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
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
    tableName: "LogoutLog",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
