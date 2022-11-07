import { UserRole, UserState } from '../user.types';

export class User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  state: UserState;
  created_at: Date;
  updated_at: Date;
}
