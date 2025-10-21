// components/FinancialSummary.tsx
"use client";

import React from 'react';
import { FinancialSummary } from '@/types/Transaction';

interface FinancialSummaryProps {
  summary: FinancialSummary | null; // Permite null
}

const FinancialSummaryCard: React.FC<FinancialSummaryProps> = ({ summary }) => {
  // Valores por defecto si summary es null o undefined
  const totalIngresos = summary?.totalIngresos || 0;
  const totalGastos = summary?.totalGastos || 0;
  const balance = summary?.balance || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Ingresos */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-sm font-semibold mb-2">TOTAL INGRESOS</div>
        <div className="text-2xl font-bold text-green-700">
          ${totalIngresos.toLocaleString()}
        </div>
        <div className="text-green-500 text-xs mt-2">💰 Ingresos Totales</div>
      </div>

      {/* Total Gastos */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-sm font-semibold mb-2">TOTAL GASTOS</div>
        <div className="text-2xl font-bold text-red-700">
          ${totalGastos.toLocaleString()}
        </div>
        <div className="text-red-500 text-xs mt-2">💸 Gastos Totales</div>
      </div>

      {/* Balance */}
      <div className={`border rounded-lg p-6 text-center ${
        balance >= 0 
          ? 'bg-blue-50 border-blue-200' 
          : 'bg-orange-50 border-orange-200'
      }`}>
        <div className={`text-sm font-semibold mb-2 ${
          balance >= 0 ? 'text-blue-600' : 'text-orange-600'
        }`}>
          BALANCE TOTAL
        </div>
        <div className={`text-2xl font-bold ${
          balance >= 0 ? 'text-blue-700' : 'text-orange-700'
        }`}>
          ${balance.toLocaleString()}
        </div>
        <div className={`text-xs mt-2 ${
          balance >= 0 ? 'text-blue-500' : 'text-orange-500'
        }`}>
          {balance >= 0 ? '✅ Ahorros' : '⚠️ Déficit'}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummaryCard;