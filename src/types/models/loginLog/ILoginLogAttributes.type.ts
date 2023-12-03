export interface ILoginLogAttributes {
  id: number;
  userId: number;
  ipAddress: string;
  userAgent: string;
  device: string;
  loginAt: Date;
  otpToken: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
}
