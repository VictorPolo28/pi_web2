// app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import FinancialSummaryCard from "@/components/FinancialSummary";
import BalanceAlert from "@/components/BalanceAlert"; // Nuevo componente
import { useAuthContext } from "@/context/AuthContext";
import { Transaction, FinancialSummary as FinancialSummaryType } from "@/types/Transaction";
import { Category } from "@/components/CategoryList";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummaryType | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar categorías
  useEffect(() => {
    if (!user?.usuario_id) return;

    const fetchCategorias = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/categorias/usuario/${user.usuario_id}`);
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, [user]);

  // Cargar transacciones y resumen
  useEffect(() => {
    if (!user?.usuario_id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [transactionsRes, summaryRes] = await Promise.all([
          fetch(`http://localhost:8080/api/transacciones/usuario/${user.usuario_id}`),
          fetch(`http://localhost:8080/api/transacciones/usuario/${user.usuario_id}/resumen`)
        ]);

        if (!transactionsRes.ok || !summaryRes.ok) {
          throw new Error("Error al cargar datos financieros");
        }

        const transactionsData = await transactionsRes.json();
        const summaryData = await summaryRes.json();

        console.log("📊 Resumen financiero recibido:", summaryData);

        setTransactions(transactionsData);
        setFinancialSummary(summaryData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        // Inicializa con valores por defecto en caso de error
        setFinancialSummary({
          totalIngresos: 0,
          totalGastos: 0,
          balance: 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleTransactionCreated = (newTransaction: Transaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
    fetchFinancialSummary();
  };

  const handleTransactionDeleted = (deletedId: number) => {
    setTransactions(prev => prev.filter(t => t.id !== deletedId));
    fetchFinancialSummary();
  };

  const fetchFinancialSummary = async () => {
    if (!user?.usuario_id) return;
    
    try {
      const res = await fetch(`http://localhost:8080/api/transacciones/usuario/${user.usuario_id}/resumen`);
      if (!res.ok) throw new Error("Error al cargar resumen");
      const data = await res.json();
      setFinancialSummary(data);
    } catch (error) {
      console.error("Error al cargar resumen:", error);
    }
  };

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <p>Cargando usuario...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-10 p-6">
        <p>Cargando datos financieros...</p>
      </div>
    );
  }

 return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Panel Financiero</h1>
      <p className="mb-8">Bienvenido, <strong>{user.nombre}</strong></p>

      {/* Alerta de Balance - Solo se muestra si el balance es bajo */}
      {financialSummary && (
        <BalanceAlert currentBalance={financialSummary.balance} />
      )}

      {/* Resumen Financiero */}
      <FinancialSummaryCard summary={financialSummary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Columna Izquierda - Transacciones */}
        <div>
          <TransactionForm 
            categories={categories}
            onTransactionCreated={handleTransactionCreated}
            userId={user.usuario_id}
          />
          <TransactionList 
            transactions={transactions}
            onTransactionDeleted={handleTransactionDeleted}
          />
        </div>

        {/* Columna Derecha - Categorías */}
        <div>
          <CategoryList />
        </div>
      </div>
    </div>
  );
}