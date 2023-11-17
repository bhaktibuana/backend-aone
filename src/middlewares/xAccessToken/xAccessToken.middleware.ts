import { Request, Response, NextFunction } from "express";

import { config } from "@/configs";
import { response } from "@/utils";

class XAccessToken {
  constructor() {}

  public xAccessTokenCheck(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (req.path.split("/")[1] === "aps") return next();

    if (req.headers["x-access-token"] === undefined) {
      response("Forbidden", 403, res);
    } else if (req.headers["x-access-token"] !== config.xAccessToken) {
      response("Invalid x-access-token", 403, res);
    } else {
      next();
    }
  }
}

export const xAccessToken = new XAccessToken();
