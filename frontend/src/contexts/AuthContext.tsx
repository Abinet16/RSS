"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User, AuthResponse } from '@/types';
import { authService, userService } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = authService.getAuth();
    if (auth.token && auth.user) {
      setUser(auth.user);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await userService.login({ email, password });
      if (response.success && response.data) {
        authService.setAuth(response.data.token, response.data.user);
        setUser(response.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error: ', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const response = await userService.createUser({ email, password });
      if (response.success) {
        await login(email, password);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error: ', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};