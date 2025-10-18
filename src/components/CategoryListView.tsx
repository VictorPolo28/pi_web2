import React from "react";
import { Category, LoadingStatus } from "./CategoryList";

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
    return <p className="text-gray-600">Cargando categorías...</p>;
  }

  if (status.error) {
    return <p className="text-red-500">Error: {status.error}</p>;
  }

  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-semibold mb-4">Tus Categorías</h3>
      
      {category.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay categorías registradas</p>
      ) : (
        <div className="space-y-3">
          {category.map((cat) => (
            <div key={cat.id} className="p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {cat.nombreCategoria} {/* Cambiado aquí */}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {cat.description || "Sin descripción"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(cat)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryListView;