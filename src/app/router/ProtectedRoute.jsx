import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/marketplace/home" replace />;
  }
  return children;
}
export {
  ProtectedRoute
};
