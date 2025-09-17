"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // ⚡ Aquí deberías usar la API real para crear usuario
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      alert("Registro exitoso ✅");

      // 👇 Cambiar esta ruta si el dashboard está en otro path
      router.push("/dashboard");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleRegister}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
}
