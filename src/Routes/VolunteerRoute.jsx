import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

const VolunteerRoute = ({ children }) => {
  const { dbUser, loading } = useContext(AuthContext);

  if (loading) return null;

  if (dbUser?.role !== "admin" && dbUser?.role !== "volunteer") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default VolunteerRoute;
