import { Router } from "express";

import { logoutController } from "@/controllers";
import { PrivateAPI } from "@/apis";

export const logoutRoute = Router();
const publicApi = new PrivateAPI(logoutController, logoutRoute);

publicApi.post("/", logoutController.logout);
