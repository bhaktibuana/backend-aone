import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import { router } from "@/routes";
import { config } from "@/configs";

export class App {
  constructor(port: number) {
    this.init();
    this.middlewares();
    this.routes();
    this.listenServer(port);
  }

  private app = express();
  private assetsPubPath: string =
    config.nodeEnv === "production"
      ? "./dist/assets/publicAssets"
      : "./src/assets/publicAssets";

  private init(): void {
    /**
     * Block of Code that is executed before the app is run
     */
  }

  private middlewares(): void {
    this.app.enable("trust proxy");
    this.app.use(helmet({ crossOriginEmbedderPolicy: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(process.cwd(), this.assetsPubPath)));
    this.app.use(express.static(path.join(process.cwd(), "public")));
  }

  private routes(): void {
    this.app.use("/", router);
  }

  private listenServer(port: number): void {
    this.app.listen(port, () => {
      console.log("App is running on port", port);
    });
  }
}
