import { Request, Response } from "express";
import moment from "moment";

import { Model } from "@/models";
import {
  response,
  serverErrorResponse,
  hashPassword,
  AppError,
  parseFullName,
  generateJwt,
} from "@/utils";
import { IBaseWhereParams, IUserInput } from "@/types";
import { smtpService } from "@/services";
import { config } from "@/configs";

class AuthenticationController extends Model {
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
   * Register
   */
  public async register(req: Request, res: Response): Promise<void> {
    const { body } = req;
    const createdAt = moment().toDate();
    const createdBy = "User Register";

    const password: string = body?.encrypted
      ? body?.password
      : hashPassword(body?.password);

    const setUserPayload = (roleId: number): IUserInput => ({
      firstName: body?.firstName,
      lastName: body?.lastName,
      username: body?.username,
      email: body?.email,
      password,
      roleId,
      createdAt,
      createdBy,
      updatedAt: createdAt,
      updatedBy: createdBy,
    });

    const transaction = await this.sequelize.transaction();

    try {
      const roleQuery = await this.models.Role.findOne({
        where: { ...this.baseWhereParams, code: "CU" },
        attributes: { exclude: this.excludes },
        transaction,
      });

      const userPayload: IUserInput = setUserPayload(
        roleQuery?.dataValues.id as number
      );

      const userEmailCount = await this.models.User.count({
        where: { isDeleted: false, email: userPayload.email },
        transaction,
      });

      const userUsernameCount = await this.models.User.count({
        where: { isDeleted: false, username: userPayload.username },
        transaction,
      });

      if (userEmailCount > 0) {
        throw new AppError(409, "Email already registered");
      } else if (userUsernameCount > 0) {
        throw new AppError(409, "Username already registered");
      }

      const userRequest = await this.models.User.create(userPayload, {
        transaction,
      });

      const token: string = generateJwt({ id: userRequest?.dataValues.id });
      const emailContext = {
        fullName: parseFullName(
          userRequest?.dataValues.firstName,
          userRequest?.dataValues.lastName
        ),
        loginUrl: `${config.clientBaseUrl}/login`,
        username: userRequest?.dataValues.username,
        email: userRequest?.dataValues.email,
        actionUrl: `${config.clientBaseUrl}/verifyAccount?token=${token}`,
        appLogoUrl: `${req.protocol}://${req.headers.host}/aone-logo.png`,
      };

      transaction.afterCommit(() => {
        smtpService.sendEmail(
          "Welcome to Aone",
          "mailVerification",
          emailContext,
          {
            to: userRequest?.dataValues.email,
          }
        );

        const { password, ...userResponse } = userRequest?.dataValues;
        response<typeof userResponse>(
          "Registration success",
          201,
          res,
          userResponse
        );
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }

  /**
   * Check Email Exist
   */
  public async checkEmail(req: Request, res: Response): Promise<void> {
    const { query } = req;

    const payload = {
      email: query?.email as string,
    };

    try {
      const userQuery = await this.models.User.count({
        where: { isDeleted: false, ...payload },
      });

      if (userQuery === 0) {
        response("Email is available", 200, res, true);
      } else {
        response("Email is not available", 409, res, true);
      }
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }

  /**
   * Check Username Exist
   */
  public async checkUsername(req: Request, res: Response): Promise<void> {
    const { query } = req;

    const payload = {
      username: query?.username as string,
    };

    try {
      const userQuery = await this.models.User.count({
        where: { isDeleted: false, ...payload },
      });

      if (userQuery === 0) {
        response("Username is available", 200, res, true);
      } else {
        response("Username is not available", 409, res, true);
      }
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }
}

export const authenticationController = new AuthenticationController();
