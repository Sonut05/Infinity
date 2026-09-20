import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  type AdminUser,
  adminLoginApi,
  adminLogoutApi,
  getAdminMeApi,
} from '../config/api';

interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionExpired: boolean;
  clearSessionExpired: () => void;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  handleUnauthorized: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const res = await getAdminMeApi();
      if (res.authenticated && res.admin) {
        setAdmin(res.admin);
        setIsAuthenticated(true);
        return true;
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch {
      setAdmin(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
    setIsLoading(true);
    setSessionExpired(false);
    try {
      const res = await adminLoginApi(email, password);
      if (res.ok && res.admin) {
        setAdmin(res.admin);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { ok: true };
      }
      setIsLoading(false);
      return { ok: false, error: res.error || 'Invalid email or password.' };
    } catch {
      setIsLoading(false);
      return { ok: false, error: 'Authentication service unavailable.' };
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await adminLogoutApi();
    setAdmin(null);
    setIsAuthenticated(false);
    setSessionExpired(false);
    setIsLoading(false);
  };

  const handleUnauthorized = useCallback(() => {
    if (isAuthenticated) {
      setSessionExpired(true);
    }
    setAdmin(null);
    setIsAuthenticated(false);
  }, [isAuthenticated]);

  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        isLoading,
        sessionExpired,
        clearSessionExpired,
        login,
        logout,
        checkAuth,
        handleUnauthorized,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
