import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, dbUser, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log("AUTH STATE:", {
    user,
    dbUser,
    loading,
  });

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!dbUser) return null;

  // 🚫 Blocked user (IMPORTANT: after loading)
  if (dbUser && dbUser.status === "blocked") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600">
            Your account has been blocked
          </h2>
          <p className="mt-3 text-gray-600">
            Please contact the administrator for further assistance.
          </p>
        </div>
      </div>
    );
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;
