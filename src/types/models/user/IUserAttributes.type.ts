export interface IUserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  roleId: number;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date;
  deletedBy: string;
  isVerified: string;
  isActive: boolean;
  isDeleted: boolean;
}
