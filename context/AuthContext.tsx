import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AffiliateUser } from '../types';
import { api } from '../services/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

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
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch extended profile from Firestore
        const profile = await api.getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<User | AffiliateUser | null> => {
    const loggedInUser = await api.login(email, password);
    // User state updates automatically via onAuthStateChanged
    return loggedInUser;
  };

  const register = async (data: any) => {
    const user = await api.register(data);
    return !!user;
  };

  const logout = () => {
    api.logout();
    // User state updates automatically via onAuthStateChanged
  };

  const updateProfile = async (data: Partial<User | AffiliateUser>) => {
    if (!user) return false;
    const updatedUser = await api.updateUser(user.id, data);
    if (updatedUser) {
        setUser(updatedUser);
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