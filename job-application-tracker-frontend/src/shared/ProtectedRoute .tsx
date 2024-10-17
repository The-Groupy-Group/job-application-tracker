import { Navigate } from "react-router-dom";
import usersService from "../users/users.service";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = usersService.getToken();
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
