// src/Routes/ProtectedEmployeeRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
// import EmployeeAuth from "../Hooks/useAuth"; // <-- employee hook

const ProtectedEmployeeRoute = ({ children }) => {
  // const { empAuthData } = EmployeeAuth();

  // console.log("ggg" , empAuthData)
  // Check if employee token exists
  const token = localStorage.getItem("emp_token");

  // console.log("sssss" ,token)

  if (!token ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedEmployeeRoute;
