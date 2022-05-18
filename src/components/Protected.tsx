import { getAuthUser } from "../features/auth/authenticationSlice";
import { UserModel } from "../models";
import { useAppSelector } from "../stores/hooks";

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

const Protected = (children: React.FC) => {

    const user = useAppSelector(getAuthUser);
    
    // if (!isLoggedIn) {
    // return <Navigate to="/" replace />;
    // }
    return children;
};

export default Protected;