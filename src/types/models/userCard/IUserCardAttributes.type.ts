export interface IUserCardAttributes {
  id: number;
  userId: number;
  cardholderName: string;
  cardNumber: string;
  cardCCV: string;
  cardExpiration: Date;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  isActive: boolean;
  isDeleted: boolean;
}
