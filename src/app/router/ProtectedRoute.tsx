import { Navigate } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import type { Role } from '@/types/common.types';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps extends PropsWithChildren {
  role?: Role;
}

export function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/marketplace/home" replace />;
  }

  return children;
}