import { User } from "./user.interface";

export interface Session {
  id: string;
  createDateTime: Date;
  user: User
}
