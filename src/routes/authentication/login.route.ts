import { Router } from "express";

import { loginController } from "@/controllers";
import { PublicAPI } from "@/apis";

export const loginRoute = Router();
const publicApi = new PublicAPI(loginController, loginRoute);

publicApi.post("/", loginController.login);
publicApi.post("/verifyLogin", loginController.verifyLogin);
