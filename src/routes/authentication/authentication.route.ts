import { Router } from "express";
import { authenticationController } from "@/controllers";

export const authenticationRoute = Router();

authenticationRoute.post(
  "/register",
  authenticationController.register.bind(authenticationController)
);
