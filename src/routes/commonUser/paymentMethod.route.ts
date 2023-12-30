import { Router } from "express";

import { paymentMethodController } from "@/controllers";
import { PrivateAPI } from "@/apis";

export const paymentMethodRoute = Router();
const privateApi = new PrivateAPI(paymentMethodController, paymentMethodRoute);

privateApi.post("/", paymentMethodController.createPaymentMethod);
privateApi.get("/", paymentMethodController.getPaymentMethodList);
privateApi.delete("/", paymentMethodController.deletePaymentMethod);
