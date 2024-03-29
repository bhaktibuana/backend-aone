export interface IRoleAttributes {
  id: number;
  code: string;
  name: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
}
