export interface IRegisterRequest {
  body: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    encrypted: string;
    subscriptionCode: "basic" | "personal" | "bussiness";
    cardholderName?: string;
    cardNumber?: string;
    cardCCV?: string;
    cardExpiration?: string;
  };
}
