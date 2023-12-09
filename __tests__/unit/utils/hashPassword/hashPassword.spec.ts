import { hashPassword } from "@/utils";

jest.mock("crypto");

describe("hashPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should hash the password using SHA256", () => {
    const mockPassword = "password123";
    const mockSalt = "p@5s.@0n3";
    const expectedHash = "mockedHash";

    const digestMock = jest.fn().mockReturnValueOnce(expectedHash);
    const updateMock = jest.fn().mockReturnValueOnce({ digest: digestMock });
    const createHmacMock = jest
      .fn()
      .mockReturnValueOnce({ update: updateMock });

    (require("crypto").createHmac as jest.Mock).mockImplementationOnce(
      createHmacMock
    );

    const result = hashPassword(mockPassword);

    expect(result).toEqual(expectedHash);
    expect(createHmacMock).toHaveBeenCalledWith("sha256", mockSalt);
    expect(updateMock).toHaveBeenCalledWith(mockPassword);
    expect(digestMock).toHaveBeenCalledWith("hex");
  });
});
