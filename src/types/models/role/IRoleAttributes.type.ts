export interface IRoleAttributes {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  isActive: boolean;
  isDeleted: boolean;
}
