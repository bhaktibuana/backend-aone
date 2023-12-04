import { Request, Response } from "express";
import moment from "moment";

import { Model } from "@/models";
import { smtpService } from "@/services";
import {
  response,
  serverErrorResponse,
  AppError,
  hashPassword,
  parseDevice,
  generateOtp,
  verifyOtp,
  generateJwt,
} from "@/utils";
import {
  IBaseWhereParams,
  IBaselLocalsResponse,
  ILoginRequest,
  IUserAttributes,
  IVerifyLoginRequest,
} from "@/types";

class LoginController extends Model {
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
   * Login
   */
  public async login(req: Request, res: Response): Promise<void> {
    const { locals } = res as never as IBaselLocalsResponse;
    const { body } = req as never as ILoginRequest;
    const updatedAt = moment().toDate();
    const updatedBy = "User Login";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(body.usernameOrEmail);

    const password: string = body.encrypted
      ? body.password
      : hashPassword(body.password);

    const loginPayload = isValidEmail
      ? {
          ...this.baseWhereParams,
          email: { [this.Op.like]: body.usernameOrEmail },
          password,
        }
      : {
          ...this.baseWhereParams,
          username: body.usernameOrEmail,
          password,
        };

    const setUserLoginPayload = (otpToken: string) => ({
      ipAddress:
        (req.headers["x-forwarded-for"] as string) ||
        (req.socket.remoteAddress as string),
      userAgent: req.headers["user-agent"] as string,
      device: parseDevice(locals.device),
      otpToken,
      updatedAt,
      updatedBy,
    });

    const transaction = await this.sequelize.transaction();

    try {
      const userQuery = await this.models.User.findOne({
        where: loginPayload,
        attributes: {
          exclude: [...this.excludes, "password"],
        },
        transaction,
      });

      if (!userQuery) {
        throw new AppError(
          400,
          `Wrong ${
            isValidEmail ? "email" : "username"
          } and password combination`
        );
      } else if (!userQuery.dataValues.isVerified) {
        throw new AppError(406, "Account is not verified");
      }

      const otpPayload = generateOtp();

      const userLoginPayload = setUserLoginPayload(
        otpPayload.otpToken as string
      );

      await this.models.UserLogin.update(userLoginPayload, {
        where: { ...this.baseWhereParams, userId: userQuery.dataValues.id },
        transaction,
      });

      const emailContext = {
        otp: otpPayload.otp,
        appLogoUrl: `${req.protocol}://${req.headers.host}/aone-logo.png`,
      };

      transaction.afterCommit(() => {
        smtpService.sendEmail(
          "OTP Code for Your Aone Account",
          "otpLogin",
          emailContext,
          { to: userQuery.dataValues.email }
        );

        response("Success, OTP sent to registered email", 200, res, {
          userId: userQuery.dataValues.id,
          email: userQuery.dataValues.email,
          iat: otpPayload.iat,
          exp: otpPayload.exp,
        });
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
   * Verify Login
   */
  public async verifyLogin(req: Request, res: Response): Promise<void> {
    const { locals } = res as never as IBaselLocalsResponse;
    const { body } = req as never as IVerifyLoginRequest;
    const createdAt = moment().toDate();
    const createdBy = "User Login";

    const userLoginPayload = {
      otpToken: null,
      updatedAt: createdAt,
      updatedBy: createdBy,
    };

    const setLoginLogPayload = (loginAt: Date, otpToken: string) => ({
      userId: body.userId,
      ipAddress:
        (req.headers["x-forwarded-for"] as string) ||
        (req.socket.remoteAddress as string),
      userAgent: req.headers["user-agent"] as string,
      device: parseDevice(locals.device),
      loginAt,
      otpToken,
      createdAt,
      createdBy,
      updatedAt: createdAt,
      updatedBy: createdBy,
    });

    const transaction = await this.sequelize.transaction();

    try {
      const userLoginQuery = await this.models.UserLogin.findOne({
        where: { ...this.baseWhereParams, userId: body.userId },
        transaction,
      });

      const { verified, message } = verifyOtp(
        body.otp,
        userLoginQuery?.dataValues.otpToken as string
      );

      if (!verified) {
        throw new AppError(401, message);
      }

      await this.models.UserLogin.update(userLoginPayload, {
        where: { userId: body.userId },
        transaction,
      });

      const loginLogPayload = setLoginLogPayload(
        moment().toDate(),
        userLoginQuery?.dataValues.otpToken as string
      );

      const loginLogRequest = await this.models.LoginLog.create(
        loginLogPayload,
        { transaction }
      );

      const userQuery = await this.models.User.findOne({
        where: { ...this.baseWhereParams, id: body.userId },
        include: [
          {
            model: this.models.Role,
            as: "Role",
            required: true,
            attributes: { exclude: this.excludes },
          },
        ],
        attributes: {
          exclude: [...this.excludes, "password"],
        },
        transaction,
      });

      const accessToken = generateJwt(
        {
          ...(userQuery?.dataValues as IUserAttributes),
          loginLogId: loginLogRequest.dataValues.id,
        },
        "7d"
      );

      transaction.afterCommit(() => {
        response("Login success", 200, res, {
          accessToken,
        });
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }
}

export const loginController = new LoginController();
