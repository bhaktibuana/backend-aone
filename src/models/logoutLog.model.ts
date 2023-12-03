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
  public createdBy!: string;
  public updatedAt!: Date;
  public updatedBy!: string;
  public deletedAt!: Date | null;
  public deletedBy!: string | null;
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
    tableName: "LogoutLog",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
