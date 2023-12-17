import { Request, Response } from "express";
import moment from "moment";

import { Model } from "@/models";
import {
  response,
  serverErrorResponse,
  AppError,
  hashPassword,
  generateJwt,
} from "@/utils";
import {
  IBaseWhereParams,
  IBaselLocalsResponse,
  IUpdateUserInfoRequest,
  IChangePasswordRequest,
} from "@/types";

class ProfileController extends Model {
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
   * My Token
   */
  public async myToken(_req: Request, res: Response): Promise<void> {
    const { locals } = res as never as IBaselLocalsResponse;
    const tokenPayload = locals.tokenPayload;

    if (tokenPayload === undefined)
      return response("Invalid Access Token", 401, res);

    try {
      const userQuery = await this.models.User.findOne({
        where: { ...this.baseWhereParams, id: tokenPayload.id },
        include: [
          {
            model: this.models.Role,
            as: "Role",
            required: true,
            attributes: { exclude: this.excludes },
          },
          {
            model: this.models.UserSubscription,
            as: "UserSubscription",
            required: false,
            where: { isActive: true },
            attributes: { exclude: this.excludes },
            include: [
              {
                model: this.models.Subscription,
                as: "Subscription",
                required: true,
                attributes: { exclude: this.excludes },
              },
            ],
          },
        ],
        attributes: {
          exclude: [...this.excludes, "password"],
        },
      });

      const accessToken = generateJwt({
        ...tokenPayload,
        ...userQuery?.dataValues,
      });

      response("User Access Token", 200, res, {
        accessToken,
      });
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }

  /**
   * Update User Info
   */
  public async updateUserInfo(req: Request, res: Response): Promise<void> {
    const { locals } = res as never as IBaselLocalsResponse;
    const { body } = req as never as IUpdateUserInfoRequest;
    const userId = locals.tokenPayload?.id as number;

    const payload = {
      firstName: body.firstName,
      lastName: body.lastName,
    };

    try {
      const userRequest = await this.models.User.update(payload, {
        where: { ...this.baseWhereParams, id: userId },
      });

      if (userRequest[0] > 0) {
        response("Update User Info success", 200, res, userRequest);
      } else {
        response("Update User Info failed", 400, res);
      }
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }

  /**
   * Change Password
   */
  public async changePassword(req: Request, res: Response): Promise<void> {
    const { locals } = res as never as IBaselLocalsResponse;
    const { body } = req as never as IChangePasswordRequest;
    const userId = locals.tokenPayload?.id as number;

    if (body.newPassword !== body.newPasswordConfirmation)
      return response("Password does not match", 400, res);

    const checkPasswordPayload = body.encrypted
      ? {
          password: body.oldPassword,
        }
      : {
          password: hashPassword(body.oldPassword),
        };

    const payload = body.encrypted
      ? {
          password: body.newPassword,
        }
      : {
          password: hashPassword(body.newPassword),
        };

    try {
      const userCount = await this.models.User.count({
        where: {
          ...this.baseWhereParams,
          id: userId,
          password: checkPasswordPayload.password,
        },
      });

      if (userCount === 0) return response("Wrong old password", 400, res);

      const userRequest = await this.models.User.update(payload, {
        where: { ...this.baseWhereParams, id: userId },
      });

      if (userRequest[0] > 0) {
        response("Change password success", 200, res, userRequest);
      } else {
        response("Change password failed", 400, res);
      }
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }
}

export const profileController = new ProfileController();
