import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import { router } from "@/routes";

export class App {
  constructor(port: number) {
    this.init();
    this.middlewares();
    this.routes();
    this.listenServer(port);
  }

  private app = express();

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
