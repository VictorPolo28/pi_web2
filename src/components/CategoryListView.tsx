"use client";

import React from "react";
import { Category, LoadingStatus } from "./CategoryList";
import Image from "next/image";

interface CategoryListViewProps {
  status: LoadingStatus;
  category: Category[];
  setEditingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  deleteCategory: (id?: number) => void;
}

const CategoryListView: React.FC<CategoryListViewProps> = ({
  status,
  category,
  setEditingCategory,
  deleteCategory,
}) => {
  if (status.cargando) {
    return (
      <div className="flex items-center justify-center py-6">
        <p className="text-gray-600 text-lg">Cargando categorías...</p>
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <Image
          src="/iconos/errorLista.png"
          alt="Error al cargar"
          width={40}
          height={40}
          className="mx-auto mb-3"
        />
        <h3 className="text-red-800 font-semibold text-lg mb-1">
          Error al cargar categorías
        </h3>
        <p className="text-red-600">{status.error}</p>
      </div>
    );
  }

  if (category.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
        <Image
          src="/iconos/folder-error.png"
          alt="Sin categorías"
          width={40}
          height={40}
          className="mx-auto mb-3"
        />
        <h3 className="text-gray-700 font-semibold text-lg">No hay categorías</h3>
        <p className="text-gray-500 mt-1">
          Crea tu primera categoría para comenzar.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Tus Categorías
      </h3>

      <div className="space-y-4">
        {category.map((cat) => (
          <div
            key={cat.id}
            className="p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-800 text-lg">
                  {cat.nombreCategoria}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {cat.description || "Sin descripción"}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setEditingCategory(cat)}
                  className="bg-white bg-opacity-60 hover:bg-opacity-100 border border-gray-300 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  title="Editar categoría"
                >
                  <Image
                    src="/iconos/edit.png"
                    alt="Editar"
                    width={18}
                    height={18}
                  />
                </button>

                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="bg-white bg-opacity-60 hover:bg-opacity-100 border border-red-300 text-red-600 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                  title="Eliminar categoría"
                >
                  <Image
                    src="/iconos/delete.png"
                    alt="Eliminar"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryListView;
