import DeviceDetector from "device-detector-js";

import { parseDevice } from "@/utils";

describe("parseDevice", () => {
  it("should return os name when os is not null and device is null", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: { name: "Windows" },
      device: null,
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Windows");
  });

  it("should return device brand + device model when os is null and device brand and device model are not empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: null,
      device: {
        brand: "Samsung",
        model: "Galaxy S20",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Samsung Galaxy S20");
  });

  it("should return device brand when os is null and device model empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: null,
      device: {
        brand: "Samsung",
        model: "",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Samsung");
  });

  it("should return device model when os is null and device brand empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: null,
      device: {
        brand: "",
        model: "Galaxy S20",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Galaxy S20");
  });

  it("should return device type when os is null and device brand and device model are empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: null,
      device: {
        brand: "",
        model: "",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("smartphone");
  });

  it("should return device brand + device model when os is not null and device brand and device model are not empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: { name: "Android" },
      device: {
        brand: "Samsung",
        model: "Galaxy S20",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Samsung Galaxy S20");
  });

  it("should return device brand + os name when os is not null and device model is empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: { name: "Android" },
      device: {
        brand: "Samsung",
        model: "",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Samsung Android");
  });

  it("should return os name + device model when os is not null and device brand is empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: { name: "Android" },
      device: {
        brand: "",
        model: "Galaxy S20",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Android Galaxy S20");
  });

  it("should return os name + device type when os is not null and device brand and device model is empty string", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: { name: "Android" },
      device: {
        brand: "",
        model: "",
        type: "smartphone",
      },
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Android smartphone");
  });

  it("should return client name as a fallback", () => {
    const deviceObject = {
      client: { name: "Browser" },
      os: null,
      device: null,
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("Browser");
  });

  it("should return client name as a fallback (undefined)", () => {
    const deviceObject = {
      client: null,
      os: null,
      device: null,
    };
    const result = parseDevice(
      deviceObject as DeviceDetector.DeviceDetectorResult
    );
    expect(result).toBe("undefined");
  });
});
