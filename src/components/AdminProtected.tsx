import { Navigate } from "react-router-dom";
import { getAuthUser } from "../features/auth/authenticationSlice";
import { useAppSelector } from "../stores/hooks";

const AdminProtected = ({ children }: { children: JSX.Element }) => {
  const user = useAppSelector(getAuthUser);
  return user?.isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminProtected;
