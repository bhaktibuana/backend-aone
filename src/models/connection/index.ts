import { Sequelize } from "sequelize";

import { dbConfig, config } from "@/configs";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: config.nodeEnv === "production" ? false : console.log,
    dialectModule: dbConfig.dialectModule,
  }
);
