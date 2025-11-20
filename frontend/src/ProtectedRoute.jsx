import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
  const profile = useSelector((state) => state.user.profile);

  if (!profile || Object.keys(profile).length === 0)
    return <div>Loading profile...</div>;

  if (allowedRoles && !allowedRoles.includes(profile.accountType)) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
};
