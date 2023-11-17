import { Request, Response } from "express";
import moment from "moment";
import path from "path";
import fs from "fs";

import { parseDevice } from "@/utils/parseDevice.util";
import { TLogOptions } from "@/types";

export const logFormat = (tokens: any, req: Request, res: Response): string => {
  const { device } = res.locals;
  const date = `[${tokens.date(req, res, "web")}]`;
  const url = `"${tokens.method(req, res)} ${tokens.url(
    req,
    res
  )} HTTP/${tokens["http-version"](req, res)}"`;
  const responseTime = `${tokens["response-time"](req, res)}ms`;
  const ipAddress = `${tokens["remote-addr"](req, res)}`;
  const userAgent = `"${tokens["user-agent"](req, res)}"`;
  return [
    date,
    url,
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    responseTime,
    ipAddress,
    userAgent,
    parseDevice(device),
  ].join(" ");
};

export const logOptions = (): TLogOptions => {
  const today = moment();
  const date = today.format("YYYYMMDD");
  const sevenDaysAgo = today.subtract(30, "days").format("YYYYMMDD");
  const appDir = process.cwd();
  const logDir = path.join(appDir, "./logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  } else {
    fs.readdir(logDir, (error, files) => {
      if (error) return;
      files.forEach((file) => {
        const fileDate = file.split("-")[1].split(".")[0];
        if (
          moment(fileDate, "YYYYMMDD").isSameOrBefore(
            moment(sevenDaysAgo, "YYYYMMDD")
          )
        )
          fs.unlink(path.join(logDir, file), (error) => {
            return;
          });
      });
    });
  }

  return {
    stream: fs.createWriteStream(path.join(logDir, `logfile-${date}.log`), {
      flags: "a",
    }),
  };
};
