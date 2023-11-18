import { config as dotenvConfig } from "dotenv";
dotenvConfig();

class Config {
  constructor() {
    this.nodeEnv = process.env.NODE_ENV || "development";
    this.serverPort = parseInt(process.env.SERVER_PORT || "3000");
    this.xAccessToken = process.env.X_ACCESS_TOKEN || "";
    this.clientBaseUrl = process.env.CLIENT_BASE_URL || "";
    this.jwtSecretKey = process.env.JWT_SECRET_KEY || "";

    if (this.nodeEnv === "development") {
      this.serverPort = 3000;
    }
  }

  public nodeEnv: string;
  public serverPort: number;
  public xAccessToken: string;
  public clientBaseUrl: string;
  public jwtSecretKey: string;
}

export const config = new Config();
