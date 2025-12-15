// src/Routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAdminAuth from "../Hooks/useAuth"; // ✅ Make sure this path is correct

const ProtectedRoute = ({ children }) => {
  const { AdminAuthData } = useAdminAuth();

  // Check if admin token exists in memory or fallback from localStorage
  const isAuthenticated =
    !!AdminAuthData?.token || !!localStorage.getItem("admin_token");

  if (!isAuthenticated) {
    // Redirect to correct admin login route
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
