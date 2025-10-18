import React from "react";
import { Category } from "./CategoryList";

interface CategoryFormProps {
  newCategory: Category;
  setNewCategory: React.Dispatch<React.SetStateAction<Category>>;
  createCategory: (e: React.FormEvent) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  newCategory,
  setNewCategory,
  createCategory,
}) => {
  return (
    <form onSubmit={createCategory} className="mb-6 w-full max-w-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la categoría *
        </label>
        <input
          type="text"
          value={newCategory.nombreCategoria} // Cambiado aquí
          onChange={(e) =>
            setNewCategory({ ...newCategory, nombreCategoria: e.target.value }) // Cambiado aquí
          }
          placeholder="Ej: Alimentación, Transporte, etc."
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
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          placeholder="Descripción de la categoría"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200 w-full"
      >
        Crear Categoría
      </button>
    </form>
  );
};

export default CategoryForm;