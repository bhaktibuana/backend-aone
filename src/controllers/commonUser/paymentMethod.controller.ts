import { Request, Response } from "express";
import moment from "moment";

import { Model } from "@/models";
import {
  response,
  serverErrorResponse,
  AppError,
  generateJwt,
  requestPagination,
  responsePagination,
} from "@/utils";
import {
  IBaselLocalsResponse,
  ICreatePaymentMethodRequest,
  IDeletePaymentMethodRequest,
  IGetPaymentMethodListRequest,
  IUserCardInput,
} from "@/types";

class PaymentMethodController extends Model {
  constructor() {
    super();
    this.excludes = [
      "updatedAt",
      "updatedBy",
      "deletedAt",
      "deletedBy",
      "isDeleted",
    ];
  }

  private excludes: string[];

  /**
   * Create Payment Method
   */
  public async createPaymentMethod(req: Request, res: Response): Promise<void> {
    const { body } = req as never as ICreatePaymentMethodRequest;
    const { locals } = res as never as IBaselLocalsResponse;
    const createdAt = moment().toDate();
    const createdBy = locals.tokenPayload?.username as string;

    const payload: IUserCardInput = {
      userId: locals.tokenPayload?.id as number,
      cardholderName: body.cardholderName,
      cardNumber: body.cardNumber,
      cardCCV: generateJwt({ cardCCV: body.cardCCV }),
      cardExpiration: moment(body.cardExpiration, "MM/YY").toDate(),
      createdAt,
      createdBy,
      isActive: false,
    };

    try {
      const userCardCount = await this.models.UserCard.count({
        where: {
          cardNumber: body.cardNumber,
          isDeleted: false,
        },
      });

      if (userCardCount > 0)
        throw new AppError(409, "Card number has already registered");

      const userCardRequest = await this.models.UserCard.create(payload);

      if (userCardRequest) {
        response("Create payment method success", 201, res, userCardRequest);
      } else {
        throw new AppError(400, "Create payment method failed");
      }
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }

  /**
   * Get Payment Method List
   */
  public async getPaymentMethodList(
    req: Request,
    res: Response
  ): Promise<void> {
    const { query } = req as never as IGetPaymentMethodListRequest;
    const { locals } = res as never as IBaselLocalsResponse;

    const paginationParams = requestPagination(
      query.perPage as string,
      query.page as string,
      query.sortAsc as string,
      query.sortDesc as string
    );

    try {
      const userCardQuery = await this.models.UserCard.findAndCountAll({
        where: {
          userId: locals.tokenPayload?.id as number,
          isDeleted: false,
          [this.Op.or]: [
            { cardholderName: { [this.Op.like]: `%${query.search}%` } },
          ],
        },
        attributes: {
          exclude: [...this.excludes, "cardCCV", "userId"],
        },
        ...paginationParams,
      });

      const userCardResult = userCardQuery.rows.map((item) => {
        const isExpired = moment(item.cardExpiration).isBefore(moment());
        const status = isExpired
          ? "expired"
          : item.isActive
          ? "active"
          : "inactive";

        return {
          id: item.id,
          cardholderName: item.cardholderName,
          cardNumber: item.cardNumber,
          createdAt: item.createdAt,
          createdBy: item.createdBy,
          status,
        };
      });

      response(
        "Payment method list",
        200,
        res,
        userCardResult,
        responsePagination(
          userCardQuery.count,
          paginationParams.limit,
          query.page
        )
      );
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }

  /**
   * Get Payment Method List
   */
  public async deletePaymentMethod(req: Request, res: Response): Promise<void> {
    const { body } = req as never as IDeletePaymentMethodRequest;
    const { locals } = res as never as IBaselLocalsResponse;
    const deletedAt = moment().toDate();
    const deletedBy = locals.tokenPayload?.username as string;

    const payload = {
      isActive: false,
      isDeleted: true,
      deletedAt,
      deletedBy,
    };

    try {
      if (body.ids.length === 0)
        throw new AppError(400, "Invalid payment method id");

      const userCardRequest = await this.models.UserCard.update(payload, {
        where: { id: body.ids },
      });

      if (userCardRequest[0] > 0) {
        response(
          "Delete payment method(s) success",
          200,
          res,
          userCardRequest[0]
        );
      } else {
        response("Delete payment method(s) failed", 400, res);
      }
    } catch (error) {
      serverErrorResponse(error, res);
    } finally {
      return;
    }
  }
}

export const paymentMethodController = new PaymentMethodController();
