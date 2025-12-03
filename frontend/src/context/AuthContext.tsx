"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, type AuthResponse, type RegisterPayload } from "../lib/api";
import { StoredUser, authStorage } from "../lib/auth";

type AuthContextType = {
  user: StoredUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function persistSession(response: AuthResponse) {
  authStorage.setToken(response.token);
  authStorage.setUser(response.user);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = authStorage.getToken();
    const storedUser = authStorage.getUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const applyAuth = useCallback((response: AuthResponse) => {
    persistSession(response);
    setToken(response.token);
    setUser(response.user);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        const response = await api.login(email, password);
        applyAuth(response);
      } finally {
        setIsLoading(false);
      }
    },
    [applyAuth]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      setIsLoading(true);
      try {
        await api.register(payload);
        const response = await api.login(payload.email, payload.password);
        applyAuth(response);
      } finally {
        setIsLoading(false);
      }
    },
    [applyAuth]
  );

  const logout = useCallback(() => {
    authStorage.clearToken();
    authStorage.clearUser();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login,
      register,
      logout
    }),
    [user, token, isLoading, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }
  return context;
}
