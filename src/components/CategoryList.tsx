"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import CategoryCard from "./CategoryCard";
import { useAuthContext } from "@/context/AuthContext";

export interface Category {
  id: number;
  nombreCategoria: string;
  description: string;
  usuarioId: number;
  tipo: "GASTO" | "INGRESO";
}

export type LoadingStatus = {
  cargando: boolean;
  error: string | null;
  completado: boolean;
};

const API_BASE_URL = "http://localhost:8080/api";

export default function CategoryList() {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [status, setStatus] = useState<LoadingStatus>({
    cargando: false,
    error: null,
    completado: false,
  });

  const [newCategory, setNewCategory] = useState<Category>({
    id: 0,
    nombreCategoria: "",
    description: "",
    usuarioId: 0,
    tipo: "GASTO",
  });

  // Manejador de errores
  const handleError = useCallback((error: unknown, mensaje: string) => {
    const mensajeError = error instanceof Error ? error.message : "Error desconocido";
    console.error(`${mensaje}:`, mensajeError);
    setNotification({ type: "error", message: `${mensaje}: ${mensajeError}` });
    setStatus(prev => ({ ...prev, cargando: false, error: mensajeError }));
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // Cargar categorías
  const fetchCategories = useCallback(async () => {
    if (!user?.usuario_id) return;

    setStatus({ cargando: true, error: null, completado: false });
    try {
      const res = await fetch(`${API_BASE_URL}/categorias/usuario/${user.usuario_id}`);
      if (!res.ok) throw new Error("Error al cargar las categorías");

      const datos = await res.json();
      
      console.log("Datos recibidos del backend:", datos);
      
      const categoriasNormalizadas = Array.isArray(datos)
        ? datos.map((cat: any) => ({
            id: cat.id,
            nombreCategoria: cat.nombreCategoria || cat.nombre_categoria || "",
            description: cat.description || "",
            usuarioId: cat.usuarioId || user.usuario_id,
            tipo: cat.tipo || "GASTO",
          }))
        : [];

      console.log("Categorías normalizadas:", categoriasNormalizadas);
      
      setCategories(categoriasNormalizadas);
      setStatus({ cargando: false, error: null, completado: true });
    } catch (e) {
      handleError(e, "Error al obtener las categorías");
    }
  }, [user, handleError]);

  // Sincroniza usuarioId
  useEffect(() => {
    if (user?.usuario_id) {
      setNewCategory(prev => ({
        ...prev,
        usuarioId: user.usuario_id,
      }));
    }
  }, [user]);

  // Cargar categorías al montar
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Crear categoría
  const createCategory = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.usuario_id) return;

    try {
      const res = await fetch(`${API_BASE_URL}/categorias/usuario/${user.usuario_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreCategoria: newCategory.nombreCategoria,
          description: newCategory.description,
          tipo: newCategory.tipo,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const createdCategory = await res.json();
      setCategories(prev => [...prev, createdCategory]);
      setNewCategory({
        id: 0,
        nombreCategoria: "",
        description: "",
        usuarioId: user.usuario_id,
        tipo: "GASTO",
      });

      setNotification({
        type: "success",
        message: "Categoría creada correctamente ",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      handleError(e, "Error al crear la categoría");
    }
  }, [user, newCategory, handleError]);

  // Actualizar categoría
  const updateCategory = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.id) return;

    try {
      console.log("Enviando datos de actualización:", editingCategory);
      
      const res = await fetch(`${API_BASE_URL}/categorias/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreCategoria: editingCategory.nombreCategoria,
          description: editingCategory.description,
          tipo: editingCategory.tipo,
          usuarioId: editingCategory.usuarioId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const updatedCategory = await res.json();
      console.log("Categoría actualizada:", updatedCategory);
      
      setCategories(prev =>
        prev.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
      );
      setEditingCategory(null);
      
      setNotification({
        type: "success",
        message: "Categoría actualizada correctamente ",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      handleError(e, "Error al actualizar la categoría");
    }
  }, [editingCategory, handleError]);

  // Eliminar categoría
  const deleteCategory = useCallback(async (id: number) => {
    if (!id || !confirm('¿Estás seguro de eliminar esta categoría?')) return;

    try {
      const res = await fetch(`${API_BASE_URL}/categorias/${id}`, { 
        method: "DELETE" 
      });
      if (!res.ok) throw new Error("Error al eliminar la categoría");

      setCategories(prev => prev.filter(cat => cat.id !== id));
      setNotification({
        type: "success",
        message: "Categoría eliminada correctamente ",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (e) {
      handleError(e, "Error al eliminar la categoría");
    }
  }, [handleError]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <Image
            src="/iconos/loading.png"
            alt="Cargando"
            width={50}
            height={50}
            className="mx-auto mb-3 animate-spin"
          />
          <p className="text-gray-600 text-lg">Cargando usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-black/60 to-cyan-600/30 rounded-2xl shadow-md border border-gray-100 p-6 ">
      {/* Notificación global */}
      {notification && (
        <div
          className={`mb-4 p-3 rounded-xl text-center flex items-center justify-center space-x-2 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <Image
            src={notification.type === "success" ? "/iconos/success.png" : "/iconos/error.png"}
            alt={notification.type === "success" ? "Éxito" : "Error"}
            width={20}
            height={20}
          />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Image
              src="/iconos/categoria.png"
              alt="Categorías"
              width={24}
              height={24}
              className="invert"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-cyan-100">Categorías</h2>
            <p className="text-cyan-200 mt-1">
              Gestiona tus categorías de gastos e ingresos
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-700 text-shadow-black flex items-center justify-end space-x-2">
            <Image
              src="/iconos/categoria.png"
              alt="Total"
              width={40}
              height={24}
              className="invert"
            />
            <span className="text-shadow-2xs">{categories.length}</span>
          </div>
          <div className="text-sm text-amber-50 text-shadow-black">Total categorías</div>
        </div>
      </div>

      {/* Formulario */}
      <div className="mb-8">
        <CategoryForm
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          createCategory={createCategory}
        />
      </div>

      {/* Estado de carga, error o lista */}
      {status.cargando ? (
        <div className="text-center py-8">
          <Image
            src="/iconos/loading.png"
            alt="Cargando"
            width={40}
            height={40}
            className="mx-auto mb-3 animate-spin"
          />
          <p className="text-gray-500">Cargando categorías...</p>
        </div>
      ) : status.error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <Image
            src="/iconos/error.png"
            alt="Error"
            width={40}
            height={40}
            className="mx-auto mb-3"
          />
          <h3 className="text-red-800 font-semibold text-lg mb-2">
            Error al cargar categorías
          </h3>
          <p className="text-red-600 mb-4">{status.error}</p>
          <button 
            onClick={fetchCategories}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
          >
            <Image
              src="/iconos/error.webp"
              alt="Reintentar"
              width={16}
              height={16}
              className="invert"
            />
            <span>Reintentar</span>
          </button>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-gradient-to-br from-blue-200 to-indigo-80 border border-blue-200 rounded-lg p-8 text-center">
          <Image
            src="/iconos/folder-error.png"
            alt="Sin categorías"
            width={60}
            height={60}
            className="mx-auto mb-3 opacity-90"
          />
          <h3 className="text-black-200 font-semibold text-lg ">
            No hay categorías
          </h3>
          <p className="text-amber-50 mt-1">
            Crea tu primera categoría para comenzar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={setEditingCategory}
              onDelete={deleteCategory}
            />
          ))}
        </div>
      )}

      {/* Modal edición */}
      {editingCategory && (
        <CategoryEditForm
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          updateCategory={updateCategory}
        />
      )}
    </div>
  );
}