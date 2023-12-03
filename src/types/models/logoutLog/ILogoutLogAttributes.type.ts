export interface ILogoutLogAttributes {
  id: number;
  loginLogId: number;
  ipAddress: string;
  userAgent: string;
  device: string;
  logoutAt: Date;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt: Date | null;
  deletedBy: string | null;
  isActive: boolean;
  isDeleted: boolean;
}
