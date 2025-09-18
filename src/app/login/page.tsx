"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // ⚡ Aquí deberías usar la API real de autenticación
        if (email && password) {
            localStorage.setItem("user", JSON.stringify({ email }));

            // 👇 Cambiar esta ruta si tu dashboard está en otra parte
            router.push("/dashboard");
        } else {
            alert("Credenciales inválidas");
        }
    };

    return (
        <div className="container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />

                <button type="submit">Entrar</button>
            </form>
            <p style={{ marginTop: "1rem", textAlign: "center" }}>
                ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
            </p>
        </div>
    );
}
