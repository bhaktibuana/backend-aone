export interface ILoginRequest {
  body: {
    usernameOrEmail: string;
    password: string;
    encrypted: string;
  };
}
