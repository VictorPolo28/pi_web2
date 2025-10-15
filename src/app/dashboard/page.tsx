"use client";

import React, { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [categorias, setCategorias] = useState<any[]>([]);
  const router = useRouter();

  // Cast the imported component to a loose React component type so we can pass props without TS errors
  const CategoryListAny = CategoryList as React.ComponentType<any>;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchCategorias = async () => {
      if (!user) return;

      try {
        const res = await fetch(`http://localhost:8080/api/users/${user.id}/categories`);
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorias();
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">Panel Financiero</h1>
      <p>Bienvenido, <strong>{user.name}</strong></p>

      <div className="mt-10">
        {/* Aquí pasas las categorías ya cargadas */}
        <CategoryListAny category={categorias} setCategory={setCategorias} />
      </div>
    </div>
  );
}