"use client"
import { useState } from "react"

const url = "http://localhost:8080/api/users/register"

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        age: "",
        phone: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Error al registrar usuario");
            const data = await res.json();
            console.log("Usuario registrado:", data);
            alert("Registro exitoso ");
        } catch (error) {
            console.error(error);
            alert("Error al registrar ");
        }
    };

    return (
       <div className="flex items-center justify-center-safe min-h-screen ">
    <div className="w-full max-w-lg sm:max-w-xl lg:max-w-3xl min-h-[500px] bg-black/40 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-white/20 flex flex-col">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white drop-shadow-md">
            Registrarce
        </h1>

        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-4 w-full" // Cambios aquí
        >
            <input
                required
                type="text"
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full max-w-md bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none text-center" // Cambios aquí
            />
            <input
                required
                type="text"
                placeholder="Apellido"
                value={form.surname}
                onChange={(e) => setForm({ ...form, surname: e.target.value })}
                className="w-full max-w-md bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none text-center"
            />
            <input
                required
                type="email"
                placeholder="Correo"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full max-w-md bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none text-center"
            />
            <input
                required
                type="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full max-w-md bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none text-center"
            />
            <input
                required
                type="number"
                placeholder="Edad"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: String(e.target.value) })}
                className="w-full max-w-md bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none text-center"
            />
            <input
                required
                type="text"
                placeholder="Teléfono"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full max-w-md bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none text-center"
            />

            <button
                type="submit"
                className="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-500 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out mt-4"
            >
                Enviar
            </button>
        </form>
    </div>
</div>
    );
}