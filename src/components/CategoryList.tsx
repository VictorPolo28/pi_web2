"use client";

import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import CategoryListView from "./CategoryListView";
import { useAuthContext } from "@/context/AuthContext";


export interface Category {
  id?: number;
  categoria_id?: number;
  nombreCategoria: string; 
  description: string;
  usuarioId?: number;
}

export type LoadingStatus = {
  cargando: boolean;
  error: string | null;
  completado: boolean;
};

export default function CategoryList() {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [status, setStatus] = useState<LoadingStatus>({
    cargando: false,
    error: null,
    completado: false,
  });

  
  const [newCategory, setNewCategory] = useState<Category>({
    nombreCategoria: "", 
    description: "",
    usuarioId: 0,
  });

  // incroniza el usuarioId cuando el usuario esté disponible
  useEffect(() => {
    if (user?.usuario_id) {
      setNewCategory((prev) => ({
        ...prev,
        usuarioId: user.usuario_id,
      }));
    }
  }, [user]);

  // Cargar categorías del usuario autenticado
  useEffect(() => {
    if (!user?.usuario_id) return;

    const getCategories = async () => {
      setStatus({ cargando: true, error: null, completado: false });

      try {
        const res = await fetch(
          `http://localhost:8080/api/categorias/usuario/${user.usuario_id}`
        );
        if (!res.ok) throw new Error("Error al cargar las categorías");

        const datos = await res.json();
        console.log("Categorías recibidas del backend:", datos);
        
        // Normaliza los datos por si acaso
        const categoriasNormalizadas = Array.isArray(datos) 
          ? datos.map((cat: any) => ({
              id: cat.id,
              nombreCategoria: cat.nombreCategoria || cat.nombre_categoria || "",
              description: cat.description || "",
              usuarioId: cat.usuarioId || user.usuario_id
            }))
          : [];
          
        setCategories(categoriasNormalizadas);
        setStatus({ cargando: false, error: null, completado: true });
      } catch (e) {
        setStatus({
          cargando: false,
          error: e instanceof Error ? e.message : "Error desconocido",
          completado: false,
        });
      }
    };

    getCategories();
  }, [user]);

  // Crear una nueva categoría 
  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.usuario_id) return;

    try {
      console.log("Enviando categoría:", {
        nombreCategoria: newCategory.nombreCategoria,
        description: newCategory.description,
       
      });

      const res = await fetch(
        `http://localhost:8080/api/categorias/usuario/${user.usuario_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombreCategoria: newCategory.nombreCategoria, 
            description: newCategory.description,
            // ELIMINA usuarioId del body - el backend ya lo tiene del path
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const createdCategory = await res.json();
      console.log(" Categoría creada:", createdCategory);

      setCategories([...categories, createdCategory]);
      //Reset con nombreCategoria
      setNewCategory({
        nombreCategoria: "", 
        description: "",
        usuarioId: user.usuario_id,
      });
    } catch (e) {
      console.error("Error al crear la categoría:", e);
      alert("Error al crear la categoría: " + (e instanceof Error ? e.message : "Error desconocido"));
    }
  };

  // Actualizar categoría 
  const updateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.id) return;

    try {
      console.log("Actualizando categoría:", editingCategory);

      const res = await fetch(
        `http://localhost:8080/api/categorias/${editingCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombreCategoria: editingCategory.nombreCategoria, // Cambiado aquí
            description: editingCategory.description,
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const updatedCategory = await res.json();
      console.log("Categoría actualizada:", updatedCategory);

      setCategories(
        categories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
      setEditingCategory(null);
    } catch (e) {
      console.error(" Error al actualizar la categoría:", e);
      alert("Error al actualizar la categoría: " + (e instanceof Error ? e.message : "Error desconocido"));
    }
  };

  // Eliminar categoría 
  const deleteCategory = async (id?: number) => {
    if (!id) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/categorias/${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Error al eliminar la categoría");

      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (e) {
      console.error("Error al eliminar la categoría:", e);
    }
  };

  // Mostrar pantalla de carga mientras se obtiene el usuario
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Formulario de creación */}
      <CategoryForm
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        createCategory={createCategory}
      />

      {/* Lista de categorías */}
      <CategoryListView
        status={status}
        category={categories}
        setEditingCategory={setEditingCategory}
        deleteCategory={deleteCategory}
      />

      {/* Formulario de edición */}
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