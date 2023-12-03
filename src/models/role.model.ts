import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { IRoleAttributes, IRoleInput } from "@/types";

export class Role
  extends Model<IRoleAttributes, IRoleInput>
  implements IRoleAttributes
{
  public id!: number;
  public code!: string;
  public name!: string;
  public createdAt!: Date;
  public createdBy!: string;
  public updatedAt!: Date;
  public updatedBy!: string;
  public deletedAt!: Date | null;
  public deletedBy!: string | null;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

Role.init(
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
      type: DataTypes.STRING(50),
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
    tableName: "Role",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
