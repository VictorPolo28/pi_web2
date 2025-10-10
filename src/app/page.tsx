
"use client";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import ImageSlider from "@/components/ImageSlider";

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <div className="text-center mt-10 ">
       <ImageSlider/>
      <h1 className="text-3xl font-bold  text-white text-shadow-lg/60">Bienvenido a tu Consejo Financiero</h1>
      <p className="mt-4  text-white text-shadow-lg/60">
        {user
          ? `Hola, ${user.name}. Gestiona tus finanzas fácilmente.`
          : "Regístrate o inicia sesión para empezar."}
      </p>
      <div className="mt-6">
        {user ? (
          <Link href="/dashboard" className=" text-white text-shadow-lg/60">
            Ir al Dashboard
          </Link>
        ) : (
          <Link href="/register" className="   text-white text-shadow-lg/60">
            Crear cuenta
          </Link>
        )}
      </div>
     
    </div>
  );
}
