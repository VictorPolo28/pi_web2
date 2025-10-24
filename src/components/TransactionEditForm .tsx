"use client";

import React, { useState, useEffect } from 'react';
import { Transaction } from '@/types/Transaction';
import { Category } from './CategoryList';

interface TransactionEditFormProps {
  transaction: Transaction;
  categories: Category[];
  onUpdate: (updatedTransaction: Transaction) => void;
  onCancel: () => void;
}

const TransactionEditForm: React.FC<TransactionEditFormProps> = ({
  transaction,
  categories,
  onUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Transaction>(transaction);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(transaction);
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/transacciones/${transaction.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: formData.descripcion,
          monto: formData.monto,
          fecha: formData.fecha,
          tipo: formData.tipo,
          categoriaId: formData.categoriaId,
        }),
      });

      if (!res.ok) throw new Error('Error al actualizar la transacción');

      const updatedTransaction = await res.json();
      onUpdate(updatedTransaction);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la transacción');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Transaction, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-blue-300 to-indigo-90 border border-blue-200 text-center w-full max-w-md  rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-amber-50 rounded-lg flex items-center justify-center mr-3">
            <img
              src="/iconos/edit.png"
              alt="Editar"
              width={20}
              height={20}
              className=""
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Editar Transacción</h3>
            <p className="text-sm text-amber-50">Modifica los datos de tu transacción</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Descripción *
            </label>
            <input
              type="text"
              value={formData.descripcion}
              onChange={(e) => handleChange('descripcion', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Monto */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Monto *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) => handleChange('monto', parseFloat(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Fecha *
            </label>
            <input
              type="date"
              value={formData.fecha.split('T')[0]} // Formatear para input date
              onChange={(e) => handleChange('fecha', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Tipo 
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => handleChange('tipo', e.target.value as "GASTO" | "INGRESO")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="GASTO">Gasto</option>
              <option value="INGRESO">Ingreso</option>
            </select>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Categoría 
            </label>
            <select
              value={formData.categoriaId}
              onChange={(e) => handleChange('categoriaId', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nombreCategoria} ({category.tipo})
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionEditForm;