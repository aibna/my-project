import useAuth from "@/hooks/useAuth";
import { signOut } from "@/utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRole = user?.user_metadata?.role;

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
