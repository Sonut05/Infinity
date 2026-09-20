import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, sessionExpired } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-card flex flex-col items-center max-w-sm w-full text-center border border-gray-100">
          <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-4" />
          <p className="text-sm font-semibold text-brand-dark tracking-wide uppercase">
            Verifying Admin Session
          </p>
          <p className="text-xs text-brand-gray mt-1">Infinity Space Group</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const searchParams = new URLSearchParams();
    if (sessionExpired) {
      searchParams.set('expired', '1');
    }
    const redirectQuery = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return <Navigate to={`/admin/login${redirectQuery}`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
