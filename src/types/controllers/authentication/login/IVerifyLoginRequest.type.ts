export interface IVerifyLoginRequest {
  body: {
    userId: number;
    otp: string;
  };
}
