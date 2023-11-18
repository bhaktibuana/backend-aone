export interface IRecipient {
  to: string[] | string;
  cc?: string[] | string;
  bcc?: string[] | string;
}
