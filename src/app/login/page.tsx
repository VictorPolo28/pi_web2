"use client";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const user = await res.json();
                console.log("Usuario logueado:", user);
                alert(`Bienvenido ${user.name}`);
            } else {
                const errorText = await res.text();
                alert(errorText || "Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error en login:", error);
            alert("Error en la conexión con el servidor");
        }
    };
    return (
        <div className="flex items-center justify-center-safe min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW56YXN8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center">

            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-3xl min-h-[500px] bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-white/20 flex flex-col">

                <h1 className="text-3xl font-semibold text-center mb-6 text-white drop-shadow-md">
                    Login
                </h1>


                <form onSubmit={handleSubmit} className="flex flex-col justify-center flex-1">

                    {/* Email */}
                    <div>
                        <label className="block font-semibold text-gray-200 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg text-center border border-gray-400/50 bg-white/20 text-white placeholder-gray-300 p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-semibold text-gray-200 mb-2">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg text-center border border-gray-400/50 bg-white/20 text-white placeholder-gray-300 p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out flex-auto"
                    >
                        Submit
                    </button>

                </form>


                <p className="text-center text-sm text-gray-300 mt-4">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-cyan-400 hover:underline">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}