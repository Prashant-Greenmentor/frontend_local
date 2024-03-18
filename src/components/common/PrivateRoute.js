// /components/common/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainLayout from "./MainLayout.js";

// PrivateRoute component using Navigate
const PrivateRoute = ({ element: Element, ...rest }) => {
  // Check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the provided element wrapped in MainLayout if authenticated
  return (
    <MainLayout>
      <Element {...rest} />
    </MainLayout>
  );
};

export default PrivateRoute;
