import { Request, Response } from "express";
import moment from "moment";

import { Model } from "@/models";
import { response, serverErrorResponse, hashPassword, AppError } from "@/utils";
import { IBaseWhereParams, IUserInput } from "@/types";

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

      const { password, ...userRespose } = userRequest?.dataValues;

      transaction.afterCommit(() => {
        response<typeof userRespose>(
          "Registration success",
          201,
          res,
          userRespose
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
}

export const authenticationController = new AuthenticationController();
