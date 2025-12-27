import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth?.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}
