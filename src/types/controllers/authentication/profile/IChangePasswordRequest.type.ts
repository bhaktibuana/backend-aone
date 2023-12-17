export interface IChangePasswordRequest {
  body: {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
    encrypted: boolean;
  };
}
