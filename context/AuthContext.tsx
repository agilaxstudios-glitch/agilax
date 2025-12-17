import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AffiliateUser } from '../types';
import { mockService } from '../services/mockService';

interface AuthContextType {
  user: User | AffiliateUser | null;
  login: (email: string, password: string) => Promise<User | AffiliateUser | null>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User | AffiliateUser>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | AffiliateUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted session on load
    const storedUser = localStorage.getItem('agilax_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | AffiliateUser | null> => {
    const loggedInUser = await mockService.login(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('agilax_user', JSON.stringify(loggedInUser));
      return loggedInUser;
    }
    return null;
  };

  const register = async (data: any) => {
    const user = await mockService.register(data);
    if (user) {
      setUser(user);
      localStorage.setItem('agilax_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agilax_user');
  };

  const updateProfile = async (data: Partial<User | AffiliateUser>) => {
    if (!user) return false;
    const updatedUser = await mockService.updateUser(user.id, data);
    if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('agilax_user', JSON.stringify(updatedUser));
        return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isLoading }}>
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