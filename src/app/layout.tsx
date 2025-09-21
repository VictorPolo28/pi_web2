
"use client";

import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="pr-24">
        {/* Navbar */}
       <nav className=" text-white px-14 py-4 shadow-md flex justify-between items-center bg-[url(https://st4.depositphotos.com/10325396/20155/i/450/depositphotos_201554746-stock-photo-double-exposure-image-stock-market.jpg)]  bg-cover bg-center ">
  {/* Logo */}
  <div className="flex items-center gap-2">
    <img src="/logo.png" alt="Logo Consejo Financiero" className="w-10 h-10" />
    <span className="text-lg font-bold">Consejo Financiero</span>
  </div>

  {/* Links */}
  <div className="flex gap-6 text-sm font-medium text-shadow-lg/30 ">
    <a href="/" className=" hover:bg-gray-600 focus:outline-2 focus:outline-offset-2 rounded  ">
      Inicio
    </a>
    <a href="/login" className=" hover:bg-gray-600 focus:outline-2 focus:outline-offset-2 rounded  ">
      Login
    </a>
    <a href="/register" className=" hover:bg-gray-600 focus:outline-2 focus:outline-offset-2 rounded ">
      Registro
    </a>
    <a href="/gastos" className="hover:bg-gray-600 focus:outline-2 focus:outline-offset-2 rounded">
      Gastos
    </a>
  </div>
</nav>

        {/* Contenido dinámico */}
        <main >{children}</main>
      </body>
    </html>
  );
}
