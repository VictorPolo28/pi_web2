"use client";

import React from "react";
import Image from "next/image";
import { Category } from "./CategoryList";

interface CategoryEditFormProps {
  editingCategory: Category;
  setEditingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  updateCategory: (e: React.FormEvent) => void;
}

const CategoryEditForm: React.FC<CategoryEditFormProps> = ({
  editingCategory,
  setEditingCategory,
  updateCategory,
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-blue-200 to-indigo-90 border border-blue-200 p-6 rounded-lg w-full max-w-md">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-50 to-blue-500 rounded-lg flex items-center justify-center mr-3">
            <Image
              src="/iconos/edit.png"
              alt="Editar"
              width={20}
              height={20}
              className=""
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Editar Categoría</h3>
            <p className="text-sm text-gray-600">Modifica los datos de tu categoría</p>
          </div>
        </div>

        <form onSubmit={updateCategory}>
          {/* Campos del formulario (igual que antes) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray mb-1">
              Nombre de la categoría 
            </label>
            <input
              type="text"
              value={editingCategory.nombreCategoria}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  nombreCategoria: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray mb-1">
              Tipo 
            </label>
            <select
              value={editingCategory.tipo}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  tipo: e.target.value as "GASTO" | "INGRESO",
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="GASTO">Gasto</option>
              <option value="INGRESO">Ingreso</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray mb-1">
              Descripción
            </label>
            <textarea
              value={editingCategory.description}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Botones con iconos */}
          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1  bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
              title="Guardar cambios"
            >
              <Image
                src="/iconos/guardar.png"
                alt="Guardar"
                width={20}
                height={20}
                className=""
              />
              <span>Guardar</span>
            </button>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
              title="Cancelar edición"
            >
              <Image
                src="/iconos/cancelar.webp"
                alt="Cancelar"
                width={20}
                height={20}
                className=""
              />
              <span>Cancelar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditForm;