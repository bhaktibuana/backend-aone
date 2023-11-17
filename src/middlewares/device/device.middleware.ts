import { Request, Response, NextFunction } from "express";
import DeviceDetector from "device-detector-js";

import { response } from "@/utils";

class Device {
  constructor() {}

  public detect(req: Request, res: Response, next: NextFunction): void {
    const userAgent: string = req.headers["user-agent"] as string;
    const detector: DeviceDetector = new DeviceDetector();
    const device: DeviceDetector.DeviceDetectorResult =
      detector.parse(userAgent);

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
