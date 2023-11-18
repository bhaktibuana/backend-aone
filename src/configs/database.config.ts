import { config as dotenvConfig } from "dotenv";
import { Dialect } from "sequelize";
import mysql2 from "mysql2";
dotenvConfig();

class DbConfig {
  constructor() {
    this.host = process.env.DB_HOST || "";
    this.username = process.env.DB_USER || "";
    this.password = process.env.DB_PASSWORD || "";
    this.database = process.env.DB_NAME || "";
    this.port = parseInt(process.env.DB_PORT || "3306");
    this.dialect = "mysql";
    this.dialectModule = mysql2;
  }

  public host: string;
  public username: string;
  public password: string;
  public database: string;
  public port: number;
  public dialect: Dialect;
  public dialectModule: typeof mysql2;
}

const dbConfig = new DbConfig();
module.exports = { ...dbConfig };
export default { ...dbConfig };
