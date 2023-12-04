export interface ISubscriptionAttributes {
  id: number;
  code: string;
  name: string;
  price: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string | null;
  deletedAt: Date | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
}
