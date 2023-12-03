export interface IUserAttributes {
  id: number;
  firstName: string;
  lastName: string | null;
  username: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
}
