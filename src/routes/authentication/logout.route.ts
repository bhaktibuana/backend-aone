import { Router } from "express";

import { logoutController } from "@/controllers";
import { PrivateAPI } from "@/apis";

export const logoutRoute = Router();
const privateApi = new PrivateAPI(logoutController, logoutRoute);

privateApi.post("/", logoutController.logout);
