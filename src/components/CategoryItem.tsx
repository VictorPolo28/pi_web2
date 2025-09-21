import React from "react";
import { Category } from "./CategoryList";

interface Props {
  cat: Category;
  setEditingCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  deleteCategory: (id?: number) => void;
}

export default function CategoryItem({
  cat,
  setEditingCategory,
  deleteCategory,
}: Props) {
  return (
    <li className="flex justify-between items-center py-2">
      <span>
        <strong className="text-gray-800">{cat.name}</strong> -{" "}
        <span className="text-gray-600">{cat.description}</span>
      </span>
      <div className="space-x-2">
        <button
          onClick={() => setEditingCategory(cat)}
          className="bg-green-500 hover:bg-green-800  text-white px-3 py-1 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  m-2"
        >
          Editar
        </button>
        <button
          onClick={() => deleteCategory(cat.id)}
          className="bg-red-500 hover:bg-red-800 text-white px-3 py-1 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  m-auto"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
