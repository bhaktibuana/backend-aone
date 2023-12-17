import { Router } from "express";

import { profileController } from "@/controllers";
import { PrivateAPI } from "@/apis";

export const profileRoute = Router();
const privateApi = new PrivateAPI(profileController, profileRoute);

privateApi.get("/", profileController.myToken);
privateApi.put("/userInfo", profileController.updateUserInfo);
privateApi.put("/changePassword", profileController.changePassword);
