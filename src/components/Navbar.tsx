"use client"
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar (){
    const {user,logout} = useAuthContext();

    return (
       <nav className="flex justify-between items-center p-4 bg-cyan-700 text-white">
      <h1 className="text-xl font-bold">Consejo Financiero</h1>
      <div className="flex gap-4">
        <Link href="/">Inicio</Link>
        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded-md">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
    );

}