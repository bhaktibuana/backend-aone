import { Op, Sequelize } from "sequelize";

import { IModels } from "@/types";
import { sequelize } from "@/models/connection";
import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";

export class Model {
  constructor() {
    this.associate();
    this.Op = Op;
    this.sequelize = sequelize;
    this.models = {
      Role,
      User,
    };
  }

  public Op: typeof Op;
  public sequelize: Sequelize;
  public models: IModels;

  private associate(): void {
    this.userAsc();
  }

  private userAsc(): void {
    User.belongsTo(Role, {
      foreignKey: "roleId",
    });
  }
}
