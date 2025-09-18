"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        password: "",
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        // ⚡ Aquí deberías guardar el usuario en tu API o DB
        if (form.name && form.email && form.age && form.password) {
            localStorage.setItem("user", JSON.stringify(form));
            router.push("/dashboard"); // 👈 o redirige al login si prefieres
        } else {
            alert("Por favor, completa todos los campos");
        }
    };

    return (
        <div className="container">
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <label>Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                />

                <label>Edad</label>
                <input
                    type="text"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Tu edad"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    required
                />

                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
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
