// components/TransactionList.tsx
"use client";

import React from 'react';
import { Transaction } from '@/types/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionDeleted: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onTransactionDeleted 
}) => {
  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta transacción?')) return;

    try {
      const res = await fetch(`http://localhost:8080/api/transacciones/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Error al eliminar transacción');

      onTransactionDeleted(id);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar transacción');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Historial de Transacciones</h3>
      
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay transacciones registradas</p>
      ) : (
        <div className="space-y-3">
          {transactions.map(transaction => (
            <div key={transaction.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">{transaction.descripcion}</span>
                    <span className={`font-bold ${
                      transaction.tipo === 'INGRESO' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.tipo === 'INGRESO' ? '+' : '-'}${transaction.monto}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{transaction.categoria?.nombreCategoria}</span>
                    <span>{new Date(transaction.fecha).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(transaction.id!)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;