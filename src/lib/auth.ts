import { UserModel } from "../models";

export enum ROLES{
    admin = 'admin',
    user = 'user',
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  'comment:delete': (user: UserModel) => {
    if (user.isAdmin) {
      return true;
    }
  
    return false;
  },
};