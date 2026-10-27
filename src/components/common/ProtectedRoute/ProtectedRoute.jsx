import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

export function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const tienePermiso =
    user && (allowedRoles.length === 0 || allowedRoles.includes(user.rol));

  useEffect(() => {
    if (!loading && user && allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
      toast.error("No tienes permisos para acceder a esta sección");
    }
  }, [loading, user, allowedRoles]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          color: "var(--color-texto-muted, #71717a)",
          fontSize: "1rem",
        }}
      >
        <span>Verificando permisos...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!tienePermiso) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
