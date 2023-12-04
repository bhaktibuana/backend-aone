import { Request, Response } from "express";
import moment from "moment";

import { Model } from "@/models";
import { response, serverErrorResponse, parseDevice } from "@/utils";
import { IBaselLocalsResponse } from "@/types";

class LogoutController extends Model {
  constructor() {
    super();
  }

  /**
   * Logout
   */
  public async logout(req: Request, res: Response): Promise<void> {
    const { locals } = res as never as IBaselLocalsResponse;
    const createdAt = moment().toDate();
    const createdBy = locals.tokenPayload?.id as number;

    const logoutLogPayload = {
      loginLogId: locals.tokenPayload?.loginLogId as number,
      ipAddress:
        (req.headers["x-forwarded-for"] as string) ||
        (req.socket.remoteAddress as string),
      userAgent: req.headers["user-agent"] as string,
      device: parseDevice(locals.device),
      logoutAt: createdAt,
      createdAt,
      createdBy,
      updatedAt: createdAt,
      updatedBy: createdBy,
    };

    try {
      await this.models.LogoutLog.create(logoutLogPayload);
      response("Logout success", 200, res);
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }
}

export const logoutController = new LogoutController();
