import { config as dotenvConfig } from "dotenv";
dotenvConfig();

class SMTPConfig {
  constructor() {
    this.smtpPort = parseInt(process.env.SMTP_PORT || "587");
    this.smtpHost = process.env.SMTP_HOST || "";
    this.smtpUsername = process.env.SMTP_USERNAME || "";
    this.smtpPassword = process.env.SMTP_PASSWORD || "";
  }

  public smtpPort: number;
  public smtpHost: string;
  public smtpUsername: string;
  public smtpPassword: string;
}

export const smtpConfig = new SMTPConfig();
