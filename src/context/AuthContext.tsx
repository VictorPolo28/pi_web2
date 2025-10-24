"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
//useCallback: Evita recreaciones innecesarias de funciones en cada render
import { User } from "@/types/User";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //  Optimiza el performance evitando recrear la función en cada render
  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Credenciales incorrectas");
      }

      const data = await res.json();
      
      //  Validación más robusta de datos del usuario
      if (!data.userId || !data.email) {
        throw new Error("Datos de usuario incompletos");
      }

      const normalizedUser: User = {
        usuario_id: data.userId,
        nombre: data.name || data.email.split('@')[0], // Fallback si no hay nombre
        correo: data.email,
        balanceMinimoAlerta: data.balanceMinimoAlerta || 1000,
      };

      setUser(normalizedUser);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
    } catch (error) {
      console.error("Error en login:", error);
      throw error; //  Relanzar error para manejo en componentes
    }
  }, []);

  // Función estable entre renders
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        // JSON.parse(savedUser) as User; convertir una cadena de texto (string) que contiene un objeto en formato JSON, en un objeto JavaScript real.
        const parsedUser = JSON.parse(savedUser) as User;
        //  Validar estructura del usuario en localStorage
        if (parsedUser && parsedUser.usuario_id && parsedUser.correo) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error al parsear usuario desde localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, //para verificar autenticación
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};


