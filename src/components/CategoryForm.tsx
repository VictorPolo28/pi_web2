import React from "react";
import { Category } from "./CategoryList";

interface Props {
  newCategory: Category;
  setNewCategory: React.Dispatch<React.SetStateAction<Category>>;
  createCategory: (e: React.FormEvent) => void;
}

export default function CategoryForm({
  newCategory,
  setNewCategory,
  createCategory,
}: Props) {
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Crear una nueva Categoria
      </h2>

      <form onSubmit={createCategory} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre de la categoria"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            placeholder="Descripción"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
