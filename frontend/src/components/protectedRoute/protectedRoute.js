import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated || (requiredRole && user.role !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
