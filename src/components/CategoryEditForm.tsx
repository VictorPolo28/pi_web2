import React from "react";
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Editar Categoría</h3>
        <form onSubmit={updateCategory}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la categoría *
            </label>
            <input
              type="text"
              value={editingCategory.nombreCategoria} // Cambiado aquí
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  nombreCategoria: e.target.value, // Cambiado aquí
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              value={editingCategory.description}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex-1"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditForm;