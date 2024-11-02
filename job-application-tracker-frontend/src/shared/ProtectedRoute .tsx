import { Navigate } from "react-router-dom";
import usersService from "../users/users.service";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return usersService.isLoggedIn() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;