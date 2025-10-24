"use client";

import React from "react";
import Image from "next/image";
import { Category } from "./CategoryList";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void; // ✅ Cambiado a number obligatorio
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  const getCategoryColor = (tipo: string) => {
    return tipo === "INGRESO"
      ? "from-green-50 to-green-100 border-green-200 text-green-800"
      : "from-red-50 to-red-100 border-red-200 text-red-800";
  };

  const getIcon = (tipo: string) => {
    return tipo === "INGRESO"
      ? "/iconos/dollar.png"
      : "/iconos/gasto.png";
  };

  return (
    <div className={`bg-gradient-to-br ${getCategoryColor(category.tipo)} border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          {/* Ícono */}
          <div className="w-10 h-10 flex items-center justify-center">
            <Image
              src={getIcon(category.tipo)}
              alt={category.tipo}
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Información de categoría */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg truncate">{category.nombreCategoria}</h3>
            <p className="text-sm opacity-75 mt-1 truncate">
              {category.description || "Sin descripción"}
            </p>
          </div>
        </div>

        {/* Etiqueta tipo */}
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            category.tipo === "INGRESO"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {category.tipo}
        </span>
      </div>

      {/* Botones Editar / Eliminar */}
      <div className="flex space-x-2 pt-3 border-t border-opacity-30">
        <button
          onClick={() => onEdit(category)}
          className="flex-1 flex items-center justify-center gap-2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-700 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-opacity-20 hover:border-opacity-40"
        >
          <Image
            src="/iconos/edit.png"
            alt="Editar"
            width={16}
            height={16}
          />
          Editar
        </button>

        <button
          onClick={() => onDelete(category.id)} // ✅ category.id es number
          className="flex-1 flex items-center justify-center gap-2 bg-white bg-opacity-50 hover:bg-opacity-100 text-red-600 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-opacity-20 hover:border-opacity-40"
        >
          <Image
            src="/iconos/delete.png"
            alt="Eliminar"
            width={16}
            height={16}
          />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;