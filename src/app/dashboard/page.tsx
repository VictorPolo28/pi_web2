"use client";

import React, { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const CategoryListAny = CategoryList as React.ComponentType<any>;

  useEffect(() => {
    const fetchCategorias = async () => {
      if (!user?.usuario_id) {
        console.error("❌No hay usuario autenticado o el ID es inválido:", user);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const userId = user.usuario_id;
        console.log(" Usuario actual:", user);
        console.log(" Consultando categorías para ID:", userId);

        const res = await fetch(`http://localhost:8080/api/categorias/usuario/${userId}`);
        
        console.log("Estado de respuesta:", res.status);
        console.log("URL llamada:", `http://localhost:8080/api/categorias/usuario/${userId}`);

        if (!res.ok) {
          const errorText = await res.text();
          console.error(" Error response:", errorText);
          throw new Error(`Error ${res.status}: ${errorText || 'Error al obtener categorías'}`);
        }

        const data = await res.json();
        console.log(" Categorías recibidas:", data);
        setCategorias(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <p>Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">Panel Financiero</h1>
      <p>Bienvenido, <strong>{user.nombre}</strong></p>
      <p>ID del usuario: <strong>{user.usuario_id}</strong></p>

      {loading && <p className="text-blue-500">Cargando categorías...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="mt-10">
        {!loading && !error && (
          <CategoryListAny category={categorias} setCategory={setCategorias} />
        )}
      </div>
    </div>
  );
}