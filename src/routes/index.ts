import { Request, Response, Router } from "express";
import { response } from "@/utils";
import { xAccessToken } from "@/middlewares";
import appRouter from "@/routes/app/app.route";

class Routes {
  constructor() {
    this.routes();
  }

  public router = Router();

  private routes(): void {
    this.router.use("/api", xAccessToken.xAccessTokenCheck, appRouter);
    this.router.use("/:anyRoute", (req: Request, res: Response): void => {
      const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
      response(`URL not found: ${url}`, 404, res);
    });
    this.router.use("/", (req: Request, res: Response): void => {
      const url = `${req.protocol}://${req.headers.host}`;
      response<{ url: string }>("Aone API Service", 200, res, { url });
    });
  }
}

const routes = new Routes();
export const router = routes.router;
