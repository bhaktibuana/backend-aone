export interface ICreatePaymentMethodRequest {
  body: {
    cardholderName: string;
    cardNumber: string;
    cardCCV: string;
    cardExpiration: string;
  };
}
