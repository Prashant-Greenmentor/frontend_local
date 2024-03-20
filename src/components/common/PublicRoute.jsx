// /components/common/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ element, restricted, ...rest }) => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (restricted) {
    // Redirect to the homepage if the user is already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  // Render the provided element if not restricted
  return React.cloneElement(element, rest);
};

export default PublicRoute;
