export interface ISubscriptionAttributes {
  id: number;
  code: string;
  name: string;
  price: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  isActive: boolean;
  isDeleted: boolean;
}
