"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "@/types/User";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();
      console.log("Datos del backend:", data);

      
      const normalizedUser: User = {
        usuario_id: data.userId || data.usuario_id || data.id, // Múltiples opciones
        nombre: data.name || data.nombre,
        correo: data.email || data.correo,
      };

      console.log(" Usuario normalizado:", normalizedUser);

      setUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } catch (error) {
      console.error(" Error en login:", error);
      alert("Error al iniciar sesión");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        console.log("Cargando usuario desde localStorage:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear usuario desde localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  return context;
};