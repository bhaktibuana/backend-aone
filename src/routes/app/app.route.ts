import { Router } from "express";
const router = Router();

/* [START ROUTING] */
import { registerRoute } from "@/routes/authentication/register.route";
router.use("/auth/register", registerRoute);

import { emailVerificationRoute } from "@/routes/authentication/emailVerification.route";
router.use("/auth/emailVerification", emailVerificationRoute);
/* [END ROUTING] */

export default router;
