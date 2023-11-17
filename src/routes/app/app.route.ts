import { Router } from "express";
const router = Router();

/* [START ROUTING] */
import { authenticationRoute } from "@/routes/authentication/authentication.route";
router.use("/auth", authenticationRoute);
/* [END ROUTING] */

export default router;
