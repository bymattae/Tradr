"use client";

import { createContext, useContext, useState } from 'react';

type User = {
  email: string | null;
  photoURL?: string | null;
  user_metadata?: {
    avatar_url?: string;
  };
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signInWithEmail = async (email: string) => {
    console.log('Sign in with email:', email);
    setUser({ email });
  };

  const signInWithGoogle = async () => {
    console.log('Sign in with Google');
    setUser({ email: 'demo@example.com' });
  };

  const signInWithApple = async () => {
    console.log('Sign in with Apple');
    setUser({ email: 'demo@example.com' });
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading: false,
      signInWithEmail,
      signInWithGoogle,
      signInWithApple,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
