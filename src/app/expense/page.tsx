"use client";
import { useState, useEffect } from "react";

interface Expense {
  description: string;
  amount: number;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function ExpenseForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);

  //  Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          console.error("Error al cargar categorías");
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expense: Expense = {
      description,
      amount,
      categoryId, // enviamos el id de la categoría seleccionada
    };

    const res = await fetch("http://localhost:8080/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });

    if (res.ok) {
      alert(" Gasto registrado correctamente");
      setDescription("");
      setAmount(0);
      setCategoryId(0);
    } else {
      alert("Error al registrar el gasto");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar Gasto</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 bg-white shadow p-6 rounded"
      >
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 rounded"
          required
        />

        {/* 🔹 Select dinámico con categorías desde la API */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border p-2 rounded"
          required
        >
          <option value={0}>Seleccionar categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Guardar Gasto
        </button>
      </form>
    </div>
  );
}
