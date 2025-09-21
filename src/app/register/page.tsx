"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  });

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
  <div className="flex items-center justify-center min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW56YXN8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center">
    {/* Tarjeta */}
    <div className="relative w-full max-w-dvh h-96 bg-black/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6">Registro</h2>

      <form onSubmit={handleSubmit} className="space-y-[10px]">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-green-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Apellido"
          value={form.surname}
          onChange={(e) => setForm({ ...form, surname: e.target.value })}
          className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-green-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-green-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-green-400 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Edad"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: String(e.target.value) })}
          className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-green-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full bg-gray-800/70 text-white placeholder-gray-400 border border-gray-500 rounded-lg p-3 focus:border-green-400 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out"
        >
          Registrarse
        </button>
      </form>
    </div>
  </div>
);
}