import { IRecipient } from "@/types/services/smtp/IRecipient.type";

export interface IMailOptions extends IRecipient {
  from: string;
  subject: string;
  text: string;
  html: any;
}
