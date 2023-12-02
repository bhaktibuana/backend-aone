import { DataTypes, Model } from "sequelize";

import { sequelize } from "@/models/connection";
import { IUserCardAttributes, IUserCardInput } from "@/types";

export class UserCard
  extends Model<IUserCardAttributes, IUserCardInput>
  implements IUserCardAttributes
{
  public id!: number;
  public userId!: number;
  public cardholderName!: string;
  public cardNumber!: string;
  public cardCCV!: string;
  public cardExpiration!: Date;
  public createdAt!: Date;
  public createdBy!: string;
  public updatedAt!: Date;
  public updatedBy!: string;
  public deletedAt!: Date;
  public deletedBy!: string;
  public isActive!: boolean;
  public isDeleted!: boolean;
}

UserCard.init(
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
    cardholderName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    cardCCV: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardExpiration: {
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
    tableName: "UserCard",
    freezeTableName: true,
    timestamps: false,
    sequelize: sequelize,
  }
);
