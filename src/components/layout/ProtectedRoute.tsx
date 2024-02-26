import { ReactNode } from "react";
import {
  TUser,
  logOut,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  let user;
  const dispatch = useAppDispatch();
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(role, user);
  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
