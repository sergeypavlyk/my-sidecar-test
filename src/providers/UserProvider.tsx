'use client';

import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { LocalStorageEnum, PathEnum } from '@/enums';
import { useRouter } from 'next/navigation';

export type User = {
  id: string;
  name: string;
  email: string;
} | null;

export type AuthContextType = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem(LocalStorageEnum.User);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem(LocalStorageEnum.User, JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LocalStorageEnum.User);
    router.push(PathEnum.Login);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
