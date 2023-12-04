export interface ILogoutLogAttributes {
  id: number;
  loginLogId: number;
  ipAddress: string;
  userAgent: string;
  device: string;
  logoutAt: Date;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date | null;
  updatedBy: number | null;
  deletedAt: Date | null;
  deletedBy: number | null;
  isActive: boolean;
  isDeleted: boolean;
}
