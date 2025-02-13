import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated (e.g., token exists in localStorage)
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute;