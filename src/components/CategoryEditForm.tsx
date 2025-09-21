import React from "react";
import { Category } from "./CategoryList";

interface Props {
  editingCategory: Category;
  setEditingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  updateCategory: (e: React.FormEvent) => void;
}

export default function CategoryEditForm({
  editingCategory,
  setEditingCategory,
  updateCategory,
}: Props) {
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
        Editando: {editingCategory.name}
      </h3>
      <form onSubmit={updateCategory} className="space-y-4">
        <input
          type="text"
          value={editingCategory.name}
          onChange={(e) =>
            setEditingCategory({
              ...editingCategory,
              name: e.target.value,
            })
          }
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={editingCategory.description}
          onChange={(e) =>
            setEditingCategory({
              ...editingCategory,
              description: e.target.value,
            })
          }
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            onClick={() => setEditingCategory(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
