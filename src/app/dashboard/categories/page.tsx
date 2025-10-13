"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriesPage() {
    const categories = [
        { name: "Ingresos", description: "Dinero que entra, como salario o ventas." },
        { name: "Gastos principales", description: "Gastos fijos como arriendo o alimentación." },
        { name: "Gastos adicionales", description: "Gastos ocasionales o no esenciales." },
        {
            name: "Servicios",
            description: "Pagos por servicios o deudas.",
            subcategories: ["Préstamos", "Créditos"],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Categorías de Dinero
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow bg-white border border-gray-200"
                    >
                        <CardHeader>
                            <CardTitle className="text-xl text-indigo-600">
                                {cat.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-700 mb-2">{cat.description}</p>

                            {cat.subcategories && (
                                <ul className="list-disc pl-5 text-gray-600">
                                    {cat.subcategories.map((sub, i) => (
                                        <li key={i}>{sub}</li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
