// src/components/Nav.tsx
"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: 12, borderBottom: "1px solid #eee" }}>
      <div>
        <Link href="/">MiApp</Link>
      </div>

      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ fontSize: 14 }}>Hola, {user.name}</span>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={() => logout()} style={{ cursor: "pointer" }}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link href="/login">Entrar</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </nav>
    </header>
  );
}
