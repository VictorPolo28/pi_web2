"use client"

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuthContext();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center-safe min-h-screen bg-[url('https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW56YXN8ZW58MHx8MHx8fDA%3D')] bg-cover bg-center">

            <div className="w-full max-w-lg sm:max-w-xl lg:max-w-3xl min-h-[500px] bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-white/20 flex flex-col">

                <h1 className="text-3xl font-semibold text-center mb-6 text-white drop-shadow-md">
                    Login
                </h1>


                <form onSubmit={handleSubmit} className="flex flex-col justify-center flex-1 space-y-8">

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block font-semibold text-gray-200 text-sm uppercase tracking-wide">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-400/50 bg-white/15 text-white placeholder-gray-300 p-4 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none backdrop-blur-sm"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="block font-semibold text-gray-200 text-sm uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-400/50 bg-white/15 text-white placeholder-gray-300 p-4 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 focus:outline-none backdrop-blur-sm"
                        />
                    </div>
    
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
                </form>



                <p className="text-center text-sm text-gray-300 mt-4">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-cyan-400 hover:underline text-shadow-lg/30">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    );
}