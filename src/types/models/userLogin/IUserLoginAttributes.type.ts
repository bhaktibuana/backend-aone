export interface IUserLoginAttributes {
  id: number;
  userId: number;
  ipAddress: string | null;
  userAgent: string | null;
  device: string | null;
  otpToken: string | null;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
}
