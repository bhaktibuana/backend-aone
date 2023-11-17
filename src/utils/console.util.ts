import { config } from "@/configs";

export const consoleLog = (title: string, payload: any): void => {
  if (config.nodeEnv === "production") return;
  console.log(`[${title}] =>`, payload);
};

export const consoleError = (title: string, payload: any): void => {
  if (config.nodeEnv === "production") return;
  console.error(`[${title}] =>`, payload);
};
