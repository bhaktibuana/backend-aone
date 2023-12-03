export interface IUserCardAttributes {
  id: number;
  userId: number;
  cardholderName: string;
  cardNumber: string;
  cardCCV: string;
  cardExpiration: Date;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date| null;
  updatedBy: string| null;
  deletedAt: Date| null;
  deletedBy: string| null;
  isActive: boolean;
  isDeleted: boolean;
}
