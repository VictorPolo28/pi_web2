"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Transaction } from '@/types/Transaction';
import { Category } from './CategoryList';
import TransactionEditForm from './TransactionEditForm ';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onTransactionDeleted: (id: number) => void;
  onTransactionUpdated: (updatedTransaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  categories,
  onTransactionDeleted,
  onTransactionUpdated
}) => {
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

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

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdate = (updatedTransaction: Transaction) => {
    onTransactionUpdated(updatedTransaction);
    setEditingTransaction(null);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTransactionConfig = (tipo: "GASTO" | "INGRESO") => {
    return tipo === "INGRESO" 
      ? {
          icon: "/iconos/dollar.png",
          bgColor: "bg-green-100",
          textColor: "text-green-600",
          borderColor: "border-green-200",
          sign: "+"
        }
      : {
          icon: "/iconos/gasto.png",
          bgColor: "bg-red-100", 
          textColor: "text-red-600",
          borderColor: "border-red-200",
          sign: "-"
        };
  };

  return (
    <>
      <div className="p-6 ">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold  text-cyan-200">Historial de Transacciones</h3>
            <p className=" text-cyan-50 mt-1">Tus movimientos recientes</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{transactions.length}</div>
            <div className="text-sm text-cyan-50 ">Total transacciones</div>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="bg-gradient-to-br from-blue-200 to-indigo-80 border border-blue-200 rounded-lg p-8 text-center">
            <Image
              src="/iconos/dollarMoneda.png"
              alt="Sin transacciones"
              width={64}
              height={64}
              className="mx-auto mb-3 opacity-80"
            />
            <h3 className="text-gray-800 font-semibold text-lg">No hay transacciones</h3>
            <p className="text-amber-50 mt-1">Registra tu primera transacción</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map(transaction => {
              const config = getTransactionConfig(transaction.tipo);
              
              return (
                <div 
                  key={transaction.id} 
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Icono de tipo de transacción */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bgColor} ${config.borderColor} border`}>
                        <Image
                          src={config.icon}
                          alt={transaction.tipo}
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      
                      {/* Información de la transacción */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-800">{transaction.descripcion}</h4>
                          <span className={`font-bold text-lg ${config.textColor}`}>
                            {config.sign}${transaction.monto.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-2">
                            <span className="bg-gray-100 px-2 py-1 rounded-md flex items-center space-x-1">
                              <Image
                                src="/iconos/categoria.png"
                                alt="Categoría"
                                width={15}
                                height={15}
                                className="opacity-60"
                              />
                              <span>{transaction.categoria?.nombreCategoria || "Sin categoría"}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center space-x-1">
                              <Image
                                src="/iconos/calendar.webp"
                                alt="Fecha"
                                width={15}
                                height={15}
                                className="opacity-60"
                              />
                              <span>{formatDate(transaction.fecha)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Botones de acción */}
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                        title="Editar transacción"
                      >
                        <Image
                          src="/iconos/edit.png"
                          alt="Editar"
                          width={18}
                          height={18}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id!)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                        title="Eliminar transacción"
                      >
                        <Image
                          src="/iconos/delete.png"
                          alt="Eliminar"
                          width={18}
                          height={18}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal de edición */}
      {editingTransaction && (
        <TransactionEditForm
          transaction={editingTransaction}
          categories={categories}
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  );
};

export default TransactionList;