import { Request, Response, NextFunction } from "express";

import { XAccessToken } from "@/middlewares/xAccessToken/xAccessToken.middleware";
import { verifyJwt, response } from "@/utils";

export class Authentication extends XAccessToken {
  constructor() {
    super();
  }

  public isAuthenticate(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      response("Unauthorized", 401, res);
    } else {
      const splitToken = req.headers.authorization.split(" ");

      if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
        response("Wrong authorization format", 400, res);
      } else {
        const { error, decoded } = verifyJwt(splitToken[1]);

        if (error && error.name === "TokenExpiredError") {
          response("Unauthorized: Token expired", 401, res);
        } else if (error) {
          response("Unauthorized: Invalid token", 401, res);
        } else {
          res.locals.tokenPayload = decoded;
          res.locals.existingToken = splitToken[1];
          next();
        }
      }
    }
  }

  public isAdmin(_req: Request, res: Response, next: NextFunction): void {
    const { Role } = res.locals.tokenPayload;

    if (Role.code === "SA") {
      next();
    } else {
      response("Forbidden: only Super Admin can access", 403, res);
    }
  }
}
