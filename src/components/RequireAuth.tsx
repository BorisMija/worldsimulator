import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../services/auth';

function RequireAuth({ children }: { children: React.ReactNode }): React.ReactElement | null {
  const location = useLocation();
  if (!auth.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

export default RequireAuth;
