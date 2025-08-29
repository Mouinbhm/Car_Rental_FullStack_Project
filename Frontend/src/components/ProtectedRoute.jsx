import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  // Simple admin check - you can enhance this with proper authentication
  const isAuthenticated =
    localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

  if (isAdmin && !isAuthenticated) {
    // Redirect to login if not authenticated as admin
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
