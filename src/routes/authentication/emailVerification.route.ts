import { Router } from "express";

import { emailVerificationController } from "@/controllers";
import { PublicAPI } from "@/apis";

export const emailVerificationRoute = Router();
const publicApi = new PublicAPI(
  emailVerificationController,
  emailVerificationRoute
);

publicApi.post("/", emailVerificationController.verifyEmail);
