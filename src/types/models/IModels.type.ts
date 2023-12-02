import { Role } from "@/models/role.model";
import { User } from "@/models/user.model";
import { Subscription } from "@/models/subscription.model";
import { UserSubscription } from "@/models/userSubscription.model";
import { UserCard } from "@/models/userCard.model";
export interface IModels {
  Role: typeof Role;
  User: typeof User;
  Subscription: typeof Subscription;
  UserSubscription: typeof UserSubscription;
  UserCard: typeof UserCard;
}
