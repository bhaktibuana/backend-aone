import { DeviceDetectorResult } from "device-detector-js";
import { IUserAttributes } from "@/types/models/user/IUserAttributes.type";
import { IRoleAttributes } from "@/types/models/role/IRoleAttributes.type";

export interface IBaselLocalsResponse {
  locals: {
    device: DeviceDetectorResult;
    tokenPayload?: IUserAttributes & {
      loginLogId: number;
      Role: IRoleAttributes;
    };
    existingToken?: string;
  };
}
