"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  user_id?: string;
  avatar_url?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  role?: string;
  groups?: any[];
}

// Smaller selected user used for navigation
interface UserItems {
  user_id: number;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

// 🔧 Extend context type to include selectedUser
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  selectedUser: UserItems | null;
  setSelectedUser: (user: UserItems) => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to access auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserItems | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setSelectedUser(null); // Optional: clear selection on logout
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, selectedUser, setSelectedUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
