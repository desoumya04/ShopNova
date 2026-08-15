import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../config/api";

/**
 * GuestRoute - Only allows access when the user is NOT logged in.
 * If the user has a valid cookie session, they are redirected to the home page.
 */
const GuestRoute = () => {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    api.get("/auth/check")
      .then(() => setStatus("authenticated"))
      .catch(() => setStatus("unauthenticated"));
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (status === "authenticated") {
    // Valid session — user is logged in, redirect away from auth pages
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
