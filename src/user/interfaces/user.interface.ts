import { Session } from "./session.interface";

export interface User {
  id?: string;
  userName: string;
  password: string;
  sessions?: Session[]
}
