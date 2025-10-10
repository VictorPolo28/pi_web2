"use client"

import { useAuthContext } from "@/context/AuthContext"
import { useEffect, useState } from "react";


 export default function DashboardPage (){ 
     const {user} = useAuthContext();
     const [cuentas, setCuentas] = useState([]);


     useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                
                const res = await fetch(`http://localhost:8080/api/users/${user.id}/accounts`);
                if (!res.ok) throw new Error("Error al obtener cuentas");
                const data = await res.json();
                setCuentas(data);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
     }, [user]);
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">Panel Financiero</h1>
      {user && <p>Bienvenido, <strong>{user.name}</strong></p>}
      <h2 className="mt-6 text-xl font-semibold">Tus cuentas</h2>
      <ul className="mt-2">
        {cuentas.map((c: any) => (
          <li key={c.cuenta_id} className="border-b py-2">
            {c.tipo_cuenta} - {c.moneda} - Saldo: {c.saldo_actual}
          </li>
        ))}
      </ul>
    </div>
  );
}