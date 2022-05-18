import { Navigate } from "react-router-dom";
import { getAuthUser } from "../features/auth/authenticationSlice";
import { useAppSelector } from "../stores/hooks";



const UserProtected = ({ children }: { children: JSX.Element }) => {

  const user = useAppSelector(getAuthUser);
  return user ? children : <Navigate to="/signIn" replace />;

};

export default UserProtected;