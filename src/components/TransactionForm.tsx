"use client";

import React, { useState, useEffect } from 'react';
import { Transaction } from '@/types/Transaction';
import { Category } from './CategoryList';

interface TransactionFormProps {
  categories: Category[];
  onTransactionCreated: (transaction: Transaction) => void;
  userId: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  categories, 
  onTransactionCreated, 
  userId 
}) => {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    descripcion: '',
    monto: 0,
    fecha: new Date().toISOString().split('T')[0],
    tipo: 'GASTO',
    categoriaId: categories[0]?.id || 0,
    usuarioId: userId
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch(
        `http://localhost:8080/api/transacciones/usuario/${userId}/categoria/${newTransaction.categoriaId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTransaction),
        }
      );

      if (!res.ok) throw new Error('Error al crear transacción');

      const createdTransaction = await res.json();
      onTransactionCreated(createdTransaction);
      
      // Reset form
      setNewTransaction({
        descripcion: '',
        monto: 0,
        fecha: new Date().toISOString().split('T')[0],
        tipo: 'GASTO',
        categoriaId: categories[0]?.id || 0,
        usuarioId: userId
      });
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear transacción');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-200 to-indigo-80 border border-blue-200 rounded-lg p-8 text-center   shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Nueva Transacción</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción 
          </label>
          <input
            type="text"
            value={newTransaction.descripcion}
            onChange={(e) => setNewTransaction({...newTransaction, descripcion: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monto 
          </label>
          <input
            type="number"
            step="0.01"
            value={newTransaction.monto}
            onChange={(e) => setNewTransaction({...newTransaction, monto: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            value={newTransaction.fecha}
            onChange={(e) => setNewTransaction({...newTransaction, fecha: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            value={newTransaction.tipo}
            onChange={(e) => setNewTransaction({...newTransaction, tipo: e.target.value as 'GASTO' | 'INGRESO'})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="GASTO">Gasto</option>
            <option value="INGRESO">Ingreso</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            value={newTransaction.categoriaId}
            onChange={(e) => setNewTransaction({...newTransaction, categoriaId: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombreCategoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-linear-to-r/srgb from-indigo-500 to-teal-400 p-6 hover:bg-blue-600 font-semibold  transition-all duration-200 transform hover:scale-[1.02] shadow-sm hover:shadow-md flex items-center justify-center space-x-2 text-white px-4 py-2 rounded-md w-full"
      >
        Agregar Transacción
      </button>
    </form>
  );
};

export default TransactionForm;