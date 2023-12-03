import { Request, Response } from "express";

import { Model } from "@/models";
import {
  response,
  serverErrorResponse,
  hashPassword,
  AppError,
  parseFullName,
  generateJwt,
  verifyJwt,
} from "@/utils";
import { IBaseWhereParams, IVerifyEmailRequest, IVerifyJwt } from "@/types";
import moment from "moment";

class EmailVerificationController extends Model {
  constructor() {
    super();
    this.baseWhereParams = { isActive: true, isDeleted: false };
    this.excludes = [
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
      "deletedAt",
      "deletedBy",
      "isActive",
      "isDeleted",
    ];
  }

  private baseWhereParams: IBaseWhereParams;
  private excludes: string[];

  /**
   * Verify Email
   */
  public async verifyEmail(req: Request, res: Response): Promise<void> {
    const { query } = req as never as IVerifyEmailRequest;
    const updatedAt = moment().toDate();
    const updatedBy = "User Register";

    const { error, decoded }: IVerifyJwt<{ id?: number }> = verifyJwt(
      query.token
    );

    if (error) return response("Invalid Token", 401, res, error.message);

    const userPaylaod = {
      isVerified: true,
      updatedAt,
      updatedBy,
    };

    const transaction = await this.sequelize.transaction();

    try {
      const checkUnverifiedUserCount = await this.models.User.count({
        where: { ...this.baseWhereParams, isVerified: false, id: decoded.id },
        transaction,
      });

      if (checkUnverifiedUserCount === 0) {
        throw new AppError(401, "Invalid Token");
      }

      const userRequest = await this.models.User.update(userPaylaod, {
        where: { ...this.baseWhereParams, id: decoded.id },
      });

      if (userRequest[0] === 0) {
        throw new AppError(400, "Failed to verify your account");
      }

      transaction.afterCommit(() => {
        response("Your account is verified", 200, res, userRequest);
      });

      await transaction.commit();
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }
}

export const emailVerificationController = new EmailVerificationController();
