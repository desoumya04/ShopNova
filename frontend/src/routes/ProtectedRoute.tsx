import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

const ProtectedRoute = () => {
  const token = localStorage.getItem("jwt");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("name");

      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch {
    localStorage.removeItem("jwt");

    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;