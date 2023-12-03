import { DeviceDetectorResult } from "device-detector-js";

export interface IBaselLocalsResponse {
  locals: {
    device: DeviceDetectorResult;
  };
}
