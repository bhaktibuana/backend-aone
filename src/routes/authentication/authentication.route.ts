import { Router } from "express";

import { authenticationController } from "@/controllers";
import { PublicAPI } from "@/apis";

export const authenticationRoute = Router();
const publicApi = new PublicAPI(authenticationController, authenticationRoute);

publicApi.get("/checkEmail", authenticationController.checkEmail);
publicApi.get("/checkUsername", authenticationController.checkUsername);

publicApi.post("/register", authenticationController.register);
