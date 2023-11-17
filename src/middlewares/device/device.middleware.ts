import { Request, Response, NextFunction } from "express";
import DeviceDetector from "device-detector-js";

import { response } from "@/utils";

class Device {
  constructor() {}

  private detector: DeviceDetector = new DeviceDetector();

  public detect(req: Request, res: Response, next: NextFunction): void {
    const userAgent: string = req.headers["user-agent"] as string;
    const device: DeviceDetector.DeviceDetectorResult =
      this.detector.parse(userAgent);

    if (device.bot !== null) {
      response<{ device: DeviceDetector.DeviceDetectorResult }>(
        "Bot detected!",
        451,
        res,
        {
          device,
        }
      );
    } else {
      res.locals.device = device;
      next();
    }
  }
}

export const device = new Device();
