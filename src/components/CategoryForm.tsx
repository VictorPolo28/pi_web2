
'use client';

import React from "react";
import { useState,useEffect,useRef } from "react";
import Image from "next/image";
import { Category } from "./CategoryList";

interface CategoryFormProps  {
  newCategory:Category;
   //React.Dispatch representa una función que dispara una acción. En este contexto, significa que es la función que React usa internamente para actualizar el estado.  React.SetStateAction Es un tipo genérico que define las dos formas válidas de actualizar el estado en React
  setNewCategory:React.Dispatch<React.SetStateAction<Category>>;
  //React.FormEvent Especifica que el argumento e es un evento de formulario sintético de React. Este tipo se usa para manejar eventos como onSubmit de un formulario (<form>).
  createCategory: (e: React.FormEvent) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  newCategory,
  setNewCategory,
  createCategory,
}) => {
  const [openSelect, setOpenSelect] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null); // referencia para manejar clics externos

  const options = [
    { value: "GASTO", label: "Gasto", icon: "/iconos/gasto.png" },
    { value: "INGRESO", label: "Ingreso", icon: "/iconos/dollar.png" },
  ];

  const selectedOption =
    options.find((opt) => opt.value === newCategory.tipo) || options[0];


  //Manejar clicks fuera del select
   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
   return (
    <form
      onSubmit={createCategory}
      className="bg-gradient-to-br from-blue-200 to-indigo-80 border border-blue-200 rounded-2xl p-6 mb-6 w-full max-w-lg mx-auto"
    >
      {/* Encabezado */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-lg flex items-center justify-center mr-3">
          <Image
            src="/iconos/addCategoria.png"
            alt="Nuevo"
            width={20}
            height={20}
            className=""
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Nueva Categoría
          </h3>
          <p className="text-sm text-gray-600">
            Agrega una nueva categoría de gasto o ingreso
          </p>
        </div>
      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la categoría 
          </label>
          <input
            type="text"
            value={newCategory.nombreCategoria}
            onChange={(e) =>
              setNewCategory({ ...newCategory, nombreCategoria: e.target.value })
            }
            placeholder="Ej: Alimentación, Salario..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Select personalizado */}
        <div className="relative" ref={selectRef}>
          <label className="block text-sm font-medium text-gray mb-2">
            Tipo
          </label>
          <div
            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white flex items-center justify-between cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-200"
            onClick={() => setOpenSelect(!openSelect)}
          >
            <div className="flex items-center space-x-3">
              <Image
                src={selectedOption.icon}
                alt={selectedOption.label}
                width={20}
                height={20}
              />
              <span>{selectedOption.label}</span>
            </div>
            <span className="text-gray-500 text-sm">▼</span>
          </div>

          {openSelect && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-lg transition"
                  onClick={() => {
                    setNewCategory({
                      ...newCategory,
                      tipo: option.value as "GASTO" | "INGRESO",
                    });
                    setOpenSelect(false);
                  }}
                >
                  <Image
                    src={option.icon}
                    alt={option.label}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <input
          type="text"
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
          placeholder="Describe el propósito de esta categoría..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-teal-400 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
      >
        <Image
          src="/iconos/addCategoria.png"
          alt="Crear"
          width={20}
          height={20}
          className=""
        />
        <span>Crear Categoría</span>
      </button>
    </form>
  );
};

export default CategoryForm;