import React from "react";
import { Category, LoadingStatus } from "./CategoryList";
import CategoryItem from "./CategoryItem";

interface Props {
  status: LoadingStatus;
  category: Category[];
  setEditingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  deleteCategory: (id?: number) => void;
}

export default function CategoryListView({
  status,
  category,
  setEditingCategory,
  deleteCategory,
}: Props) {
  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Categorías actuales
      </h2>

      {status.cargando && <p className="text-blue-500">Cargando categorías...</p>}
      {status.error && <p className="text-red-500">Error: {status.error}</p>}
      {status.completado &&
        !status.error &&
        Array.isArray(category) &&
        category.length === 0 && (
          <p className="text-gray-500">No se encontraron categorías</p>
        )}

      <ul className="divide-y divide-gray-200">
        {Array.isArray(category) &&
          category.map((cat) => (
            <CategoryItem
              key={cat.id}
              cat={cat}
              setEditingCategory={setEditingCategory}
              deleteCategory={deleteCategory}
            />
          ))}
      </ul>
    </div>
  );
}
