import { Router } from "express";
const router = Router();

/* [START ROUTING] */
import { registerRoute } from "@/routes/authentication/register.route";
router.use("/auth/register", registerRoute);

import { emailVerificationRoute } from "@/routes/authentication/emailVerification.route";
router.use("/auth/emailVerification", emailVerificationRoute);

import { loginRoute } from "@/routes/authentication/login.route";
router.use("/auth/login", loginRoute);
/* [END ROUTING] */

export default router;
