import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute component for authentication-required routes
 *
 * @example
 * ```tsx
 * <ProtectedRoute isAuthenticated={user !== null} redirectTo="/login">
 *   <Dashboard />
 * </ProtectedRoute>
 * ```
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  redirectTo = '/login',
  fallback = null,
}) => {
  const location = useLocation();

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Save the attempted location for redirect after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
