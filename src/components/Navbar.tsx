"use client"
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar (){
    const {user,logout} = useAuthContext();

    return (
       <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-black/60 to-cyan-500/30 text-cyan-50 rounded-xl backdrop-blur-md shadow-md">
      <h1 className="text-xl font-bold">Consejo Financiero</h1>
      <div className="flex gap-4">
        <Link href="/" className=" bg-gradient-to-r hover:from-red -500 hover:to-red-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex px-3 py-1">Inicio</Link>
        {user ? (
          <>
            <Link href="/dashboard" className="bg-gradient-to-r hover:from-red-500 hover:to-green-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex px-3 py-1">Mis Finanzas</Link>
            <button onClick={logout} className="bg-gradient-to-r  from-blue-500 to-purple-500 hover:from-red -500 hover:to-red-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex px-3 py-1 ">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="bg-gradient-to-r hover:from-red -500 hover:to-blue-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex px-3 py-1">Login</Link>
            <Link href="/register" className="bg-gradient-to-r hover:from-red -500 hover:to-green-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex px-3 py-1">Registro</Link>
          </>
        )}
      </div>
    </nav>
    );

}