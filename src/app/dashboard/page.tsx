// app/dashboard/page.tsx - VERSIÓN COMPLETA
"use client";

import React, { useEffect, useState, useCallback } from "react";
import CategoryList from "@/components/CategoryList";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import FinancialSummaryCard from "@/components/FinancialSummary";
import BalanceAlert from "@/components/BalanceAlert";
import { useAuthContext } from "@/context/AuthContext";
import { Transaction, FinancialSummary as FinancialSummaryType } from "@/types/Transaction";
import { Category } from "@/components/CategoryList";

// Hook personalizado para los datos del dashboard
const useDashboardData = (userId: number | undefined) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [categoriesRes, transactionsRes, summaryRes] = await Promise.all([
        fetch(`http://localhost:8080/api/categorias/usuario/${userId}`),
        fetch(`http://localhost:8080/api/transacciones/usuario/${userId}`),
        fetch(`http://localhost:8080/api/transacciones/usuario/${userId}/resumen`)
      ]);

      if (!categoriesRes.ok) throw new Error("Error al cargar categorías");
      if (!transactionsRes.ok) throw new Error("Error al cargar transacciones");
      if (!summaryRes.ok) throw new Error("Error al cargar resumen financiero");

      const [categoriesData, transactionsData, summaryData] = await Promise.all([
        categoriesRes.json(),
        transactionsRes.json(),
        summaryRes.json()
      ]);

      setCategories(categoriesData);
      setTransactions(transactionsData);
      setFinancialSummary(summaryData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      // Inicializar con valores por defecto en caso de error
      setFinancialSummary({
        totalIngresos: 0,
        totalGastos: 0,
        balance: 0
      });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    categories,
    transactions,
    financialSummary,
    loading,
    refetch: fetchData,
    setTransactions,
    setFinancialSummary
  };
};

export default function DashboardPage() {
  const { user } = useAuthContext();
  const { 
    categories, 
    transactions, 
    financialSummary, 
    loading, 
    refetch,
    setTransactions,
    setFinancialSummary
  } = useDashboardData(user?.usuario_id);

  // Manejar creación de transacción
  const handleTransactionCreated = useCallback((newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    refetchFinancialSummary();
  }, [setTransactions]);

  // Manejar eliminación de transacción
  const handleTransactionDeleted = useCallback((deletedId: number) => {
    setTransactions(prev => prev.filter(t => t.id !== deletedId));
    refetchFinancialSummary();
  }, [setTransactions]);

  // Manejar actualización de transacción
  const handleTransactionUpdated = useCallback((updatedTransaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    refetchFinancialSummary();
  }, [setTransactions]);

  // Actualizar resumen financiero
  const refetchFinancialSummary = useCallback(async () => {
    if (!user?.usuario_id) return;
    
    try {
      const res = await fetch(`http://localhost:8080/api/transacciones/usuario/${user.usuario_id}/resumen`);
      if (!res.ok) throw new Error("Error al cargar resumen");
      const data = await res.json();
      setFinancialSummary(data);
    } catch (error) {
      console.error("Error al cargar resumen:", error);
    }
  }, [user, setFinancialSummary]);

  // Estados de carga
  if (!user) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-amber-50  mt-4">Cargando información del usuario...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Cargando datos financieros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 space-y-8">
      {/* Header del Dashboard */}
      <div className="text-center  from-white/60 to-cyan-500/30 ">
        <h1 className="text-4xl font-bold text-blue-300 mb-2">Panel Financiero</h1>
        <p className="text-xl text-gray-300">
          Bienvenido, <strong className="text-blue-600">{user.nombre}</strong>
        </p>
        <p className="text-gray-300 mt-1">Gestiona tus finanzas de manera eficiente</p>
      </div>

      
       {/* Consejo Financiero */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-3"> Consejo del Día</h3>
            <p className="text-sm opacity-90">
              {financialSummary?.balance && financialSummary.balance < 0 
                ? "Tu balance es negativo. Considera reducir gastos no esenciales y buscar fuentes de ingreso adicionales."
                : "¡Buen trabajo! Mantén un registro constante de tus transacciones para mejores decisiones financieras."
              }
            </p>
          </div>

      {/* Resumen Financiero */}
      <FinancialSummaryCard summary={financialSummary} />
     
           {/* Estadísticas Rápidas */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">Resumen Rápido</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Total Transacciones:</span>
                <span className="font-bold">{transactions.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Categorías:</span>
                <span className="font-bold">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Balance Actual:</span>
                <span className={`font-bold ${
                  financialSummary?.balance && financialSummary.balance >= 0 
                    ? 'text-green-300' 
                    : 'text-red-300'
                }`}>
                  ${financialSummary?.balance.toLocaleString()}
                </span>
              </div>
            </div>
        

         
        </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
       
        {/* Columna Izquierda - Formularios */}
        <div className="xl:col-span-1 space-y-8 ">
          {/* Formulario de Transacción */}
          <div className="bg-gradient-to-r from-black/60 to-cyan-600/30 rounded-2xl shadow-md border border-gray-300 p-6 t">
            <h2 className="text-2xl font-bold text-cyan-200 mb-6">Registra tus Transacciónes</h2>
            <TransactionForm 
              categories={categories}
              onTransactionCreated={handleTransactionCreated}
              userId={user.usuario_id}
            />
          </div>
          {/* Alerta de Balance */}
      {financialSummary && (
        <BalanceAlert currentBalance={financialSummary.balance} />
      )}

         
        </div>

        {/* Columna Derecha - Categorías */}
        <div className="space-y-8 xl:col-span-2">
          <div className=" rounded-2xl shadow-sm border border-gray-100">
            <CategoryList />
          </div>
                 {/* Lista de Transacciones */}
          <div className="bg-gradient-to-r from-black/60 to-cyan-600/30 rounded-2xl shadow-md border border-gray-300 p-6 ">
            <TransactionList 
              transactions={transactions}
              categories={categories}
              onTransactionDeleted={handleTransactionDeleted}
              onTransactionUpdated={handleTransactionUpdated}
            />
          </div>
         
        </div>
      </div>

      {/* Footer del Dashboard */}
      <div className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-gray-200">
        <p>Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
      </div>
    </div>
  );
}