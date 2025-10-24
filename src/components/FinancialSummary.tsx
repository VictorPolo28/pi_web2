"use client";

import React from "react";
import Image from "next/image";
import { FinancialSummary } from "@/types/Transaction";

interface FinancialSummaryProps {
  summary: FinancialSummary | null;
}

const FinancialSummaryCard: React.FC<FinancialSummaryProps> = ({ summary }) => {
  const totalIngresos = summary?.totalIngresos || 0;
  const totalGastos = summary?.totalGastos || 0;
  const balance = summary?.balance || 0;

  const cards = [
    {
      title: "TOTAL INGRESOS",
      value: totalIngresos,
      icon: "/iconos/dollarMoneda-removebg-preview.png",
      background: "/fondos/fondoVerde.jpg",
      textColor: "text-green-700",
    },
    {
      title: "TOTAL GASTOS",
      value: totalGastos,
      icon: "/iconos/gasto.png",
      background: "/fondos/fondoRojo.jpg",
      textColor: "text-red-700",
    },
    {
      title: "BALANCE TOTAL",
      value: balance,
      icon:
        balance >= 0
          ? "/iconos/balancePositivo.png"
          : "/iconos/balanceNegativo.png",
      background:
        balance >= 0
          ? "/fondos/fondo.jpg"
          : "/fondos/fondoRojo.jpg",
      textColor: balance >= 0 ? "text-blue-700" : "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative border rounded-2xl p-6 overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 ease-out"
        >
          {/* Imagen de fondo */}
          <Image
            src={card.background}
            alt={`Fondo ${card.title}`}
            fill
            className="object-cover"
          />

          {/* Capa semitransparente para contraste */}
          <div className="absolute inset-0 bg-black/10"></div>

          {/* Contenido */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Texto con fondo y sombra */}
            <div className="bg-black/20 backdrop-blur-sm rounded-md p-3 inline-block drop-shadow-[6px_3px_4px_rgba(0,0,0,0.8)]">
              <div className={`${card.textColor} text-2xl font-bold mb-1`}>
                ${card.value.toLocaleString()}
              </div>
              <div className={`${card.textColor} text-sm font-medium`}>
                {card.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FinancialSummaryCard;
