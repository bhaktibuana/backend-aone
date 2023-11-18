import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import path from "path";
import fs from "fs";

import { consoleLog, consoleError } from "@/utils";
import { config, smtpConfig } from "@/configs";
import { IRecipient, IMailOptions, TReadHTMLFileCallback } from "@/types";

class SMTPService {
  constructor() {
    this.viewPath = path.join(
      process.cwd(),
      config.nodeEnv === "production" ? "./dist/views" : "./src/views"
    );
    this.transport = nodemailer.createTransport({
      port: smtpConfig.smtpPort,
      host: smtpConfig.smtpHost,
      auth: {
        user: smtpConfig.smtpUsername,
        pass: smtpConfig.smtpPassword,
      },
      secure: true,
    });
  }

  private viewPath: string;
  private transport: Transporter;

  private mailOptions(
    subject: string,
    html: string,
    recipient: IRecipient
  ): IMailOptions {
    return {
      from: `Aone <${smtpConfig.smtpUsername}>`,
      ...recipient,
      subject,
      text: "",
      html,
    };
  }

  private readHTMLFile(path: string, callback: TReadHTMLFileCallback): void {
    fs.readFile(
      path,
      { encoding: "utf-8" },
      (error: NodeJS.ErrnoException | null, html: string) => {
        if (error) {
          callback(error);
        } else {
          callback(null, html);
        }
      }
    );
  }

  public sendEmail(
    subject: string,
    htmlName: string,
    context: object,
    recipient: IRecipient
  ): void {
    this.readHTMLFile(
      `${this.viewPath}/${htmlName}.html`,
      (error: NodeJS.ErrnoException | null, html?: string) => {
        if (error) return consoleError("Render Email View Error", error);

        const template: HandlebarsTemplateDelegate<any> =
          handlebars.compile(html);
        const htmlResult: string = template(context);

        consoleLog("RECIPIENT", recipient);

        this.transport.sendMail(
          this.mailOptions(subject, htmlResult, recipient),
          (error, response) => {
            if (error) {
              consoleError("SMTP Error", error);
            } else {
              consoleLog("SMTP Success", response);
            }
          }
        );
      }
    );
  }
}

export const smtpService = new SMTPService();
