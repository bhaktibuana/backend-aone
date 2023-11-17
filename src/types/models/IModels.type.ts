import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";

export interface IModels {
  Role: typeof Role;
  User: typeof User;
}
