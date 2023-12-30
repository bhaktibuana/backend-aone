import { Router } from "express";
const router = Router();

/* [START ROUTING] */
import { registerRoute } from "@/routes/authentication/register.route";
router.use("/auth/register", registerRoute);

import { emailVerificationRoute } from "@/routes/authentication/emailVerification.route";
router.use("/auth/emailVerification", emailVerificationRoute);

import { loginRoute } from "@/routes/authentication/login.route";
router.use("/auth/login", loginRoute);

import { logoutRoute } from "@/routes/authentication/logout.route";
router.use("/auth/logout", logoutRoute);

import { profileRoute } from "@/routes/authentication/profile.route";
router.use("/auth/profile", profileRoute);

import { paymentMethodRoute } from "@/routes/commonUser/paymentMethod.route";
router.use("/cu/paymentMethod", paymentMethodRoute);
/* [END ROUTING] */

export default router;
