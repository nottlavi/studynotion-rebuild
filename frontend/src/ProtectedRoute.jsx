import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
  const token = useSelector((state) => state.user.token);
  const profile = useSelector((state) => state.user.profile);

  if (!profile || Object.keys(profile).length === 0)
    return <div>Loading profile...</div>;

  console.log("hello from protected route", token, profile);

  if (!token) return <Navigate to="/login" replace />;

  if (!profile) return <div>loading...</div>;

  if (allowedRoles && !allowedRoles.includes(profile.accountType)) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
};
