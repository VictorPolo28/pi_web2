// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type User = { name: string; email: string } | null;

type AuthContextType = {
    user: User;
    loading: boolean;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // ✅ Cargar sesión desde localStorage
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("loggedUser");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const register = async (name: string, email: string, password: string) => {
        if (typeof window === "undefined") return;

        const users = JSON.parse(localStorage.getItem("users") || "[]") as any[];

        // ✅ Verificar duplicados
        if (users.some((u) => u.email === email)) {
            throw new Error("Ya existe un usuario con ese email");
        }

        // ✅ Guardar nuevo usuario
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        // ✅ Guardar sesión
        const newUser = { name, email };
        localStorage.setItem("loggedUser", JSON.stringify(newUser));
        setUser(newUser);
    };

    const login = async (email: string, password: string) => {
        if (typeof window === "undefined") return;

        const users = JSON.parse(localStorage.getItem("users") || "[]") as any[];
        const found = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!found) {
            throw new Error("Correo o contraseña inválidos");
        }

        const logged = { name: found.name, email: found.email };
        localStorage.setItem("loggedUser", JSON.stringify(logged));
        setUser(logged);
    };

    const logout = () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem("loggedUser");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return ctx;
}
