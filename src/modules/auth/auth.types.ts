export enum UserRole {
  MANAGER = 'manager',
  USER = 'user',
}

export enum UserState {
  CREATED = 'created',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export class User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  state: UserState;
  created_at: Date;
  updated_at: Date;
}
