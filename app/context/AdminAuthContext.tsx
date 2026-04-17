"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminAuthContextType {
  isAdminLoggedIn: boolean;
  adminEmail: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdminLoggedIn: false,
  adminEmail: "",
  loading: true,
  login: async () => false,
  logout: () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_session");
      if (stored) {
        const { email } = JSON.parse(stored);
        setIsAdminLoggedIn(true);
        setAdminEmail(email);
      }
    } catch {
      localStorage.removeItem("admin_session");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsAdminLoggedIn(true);
        setAdminEmail(data.user.email);
        localStorage.setItem("admin_session", JSON.stringify({ email: data.user.email }));
        return true;
      }
    } catch (e) {
      console.error("Login Error:", e);
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminEmail("");
    localStorage.removeItem("admin_session");
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminEmail, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
