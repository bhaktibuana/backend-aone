import { Router } from "express";

import { registerController } from "@/controllers";
import { PublicAPI } from "@/apis";

export const registerRoute = Router();
const publicApi = new PublicAPI(registerController, registerRoute);

publicApi.get("/checkEmail", registerController.checkEmail);
publicApi.get("/checkUsername", registerController.checkUsername);

publicApi.post("/", registerController.register);
