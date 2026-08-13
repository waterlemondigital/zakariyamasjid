import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('zmt_admin_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem('zmt_admin_token');
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (res.success && res.admin) {
          setUser(res.admin);
          setToken(savedToken);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification failed, logging out.');
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const res = await api.login(credentials);
      if (res.success && res.token && res.admin) {
        localStorage.setItem('zmt_admin_token', res.token);
        setToken(res.token);
        setUser(res.admin);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (err: any) {
      return { success: false, message: 'Could not connect to authentication server.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('zmt_admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
