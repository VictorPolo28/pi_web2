"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">

      <div className="flex gap-6">
        <Link href="/" className="hover:text-gray-300">Inicio</Link>
        <Link href="/login" className="hover:text-gray-300">Login</Link>
        <Link href="/register" className="hover:text-gray-300">Registro</Link>
        <Link href="/gastos" className="hover:text-gray-300">Gastos</Link>
      </div>
    </nav>
  );
}