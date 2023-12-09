import DeviceDetector from "device-detector-js";

export const parseDevice = (
  deviceObject: DeviceDetector.DeviceDetectorResult
): string => {
  const client = deviceObject.client;
  const os = deviceObject.os;
  const device = deviceObject.device;

  if (os !== null && device === null) {
    return `${os.name}`;
  } else if (os === null && device !== null) {
    if (device.brand !== "" && device.model !== "") {
      return `${device.brand} ${device.model}`;
    } else if (device.brand !== "" && device.model === "") {
      return `${device.brand}`;
    } else if (device.brand === "" && device.model !== "") {
      return `${device.model}`;
    } else {
      return `${device.type}`;
    }
  } else if (os !== null && device !== null) {
    if (device.brand !== "" && device.model !== "") {
      return `${device.brand} ${device.model}`;
    } else if (device.brand !== "" && device.model === "") {
      return `${device.brand} ${os.name}`;
    } else if (device.brand === "" && device.model !== "") {
      return `${os.name} ${device.model}`;
    } else {
      return `${os.name} ${device.type}`;
    }
  } else {
    return `${client?.name}`;
  }
};
