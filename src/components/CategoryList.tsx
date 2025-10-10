"use client";

import React, { useState, useEffect } from "react";
import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import CategoryListView from "./CategoryListView";

// Tipos compartidos
export type Category = {
  id?: number; //? significa que la propiedad es opcional
  name: string;
  description: string;
};

export type LoadingStatus = {
  cargando: boolean;
  error: string | null;
  completado: boolean;
};

export default function CategoryList() {
  const [category, setCategory] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [status, setStatus] = useState<LoadingStatus>({
    cargando: false,
    error: null,
    completado: false,
  });

  // estado del formulario
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
  });

  // obtener las categorías
  useEffect(() => {
    const getCategories = async () => {
      setStatus({ cargando: true, error: null, completado: false });

      try {
        const res = await fetch("http://localhost:3000/categories");
        if (!res.ok) {
          throw new Error("Error al cargar las categorias");
        }
        const datos = await res.json();
        console.log("Datos del backend:", datos); // Para verificar si es array u objeto
        setCategory(Array.isArray(datos) ? datos : datos.category || []); // Ajusta según lo que devuelva el backend
        setStatus({ cargando: false, error: null, completado: true });
      } catch (e) {
        console.log("Error al obtener las categorias");
        setStatus({
          cargando: false,
          error: e instanceof Error ? e.message : "Error desconocido",
          completado: false,
        });
      }
    };
    getCategories();
  }, []);

  // crear una categoría
  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Los headers son metadatos
        body: JSON.stringify(newCategory),
      });
      if (!res.ok) {
        throw new Error("Error al crear la categoria");
      }
      const createdCategory = await res.json();
      setCategory([...category, createdCategory]); // ... = spread operator
      setNewCategory({ name: "", description: "" });
    } catch (e) {
      console.log(e);
    }
  };

  // eliminar categoría
  const deleteCategory = async (id?: number) => {
    if (!id) return; //// si no hay id, no hacemos nada
    try {
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error al eliminar la categoria");
      }
      setCategory(category.filter((cat) => cat.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  // actualizar categoría
  const updateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory?.id) return; // Validación: si no existe, cortamos

    try {
      const res = await fetch(
        `http://localhost:3000/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingCategory),
        }
      );
      if (!res.ok) {
        throw new Error("Error al actualizar la categoria");
      }
      const updatedCategory = await res.json();
      setCategory(
        category.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat
        )
      );
      setEditingCategory(null);
    } catch (e) {
      console.log(e);
    }
  };

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
        category={category}
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
