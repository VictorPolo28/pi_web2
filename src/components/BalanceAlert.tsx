
"use client";

import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';

interface BalanceAlertProps {
  currentBalance: number;
}

const BalanceAlert: React.FC<BalanceAlertProps> = ({ currentBalance }) => {
  const { user } = useAuthContext();
  const [balanceMinimo, setBalanceMinimo] = useState<number>(1000);
  const [showAlert, setShowAlert] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [nuevoBalanceMinimo, setNuevoBalanceMinimo] = useState<string>('');

  // Cargar balance mínimo del usuario
  useEffect(() => {
    const cargarBalanceMinimo = async () => {
      if (!user?.usuario_id) return;

      try {
        const res = await fetch(`http://localhost:8080/api/users/${user.usuario_id}/balance-minimo`);
        if (res.ok) {
          const data = await res.json();
          setBalanceMinimo(data.balanceMinimo || 1000);
        }
      } catch (error) {
        console.error('Error al cargar balance mínimo:', error);
      }
    };

    cargarBalanceMinimo();
  }, [user]);

  // Verificar si mostrar alerta
  useEffect(() => {
    if (currentBalance < balanceMinimo) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [currentBalance, balanceMinimo]);

  const actualizarBalanceMinimo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.usuario_id || !nuevoBalanceMinimo) return;

    try {
      const balance = parseFloat(nuevoBalanceMinimo);
      
      const res = await fetch(`http://localhost:8080/api/users/${user.usuario_id}/balance-minimo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ balanceMinimo: balance }),
      });

      if (!res.ok) throw new Error('Error al actualizar balance mínimo');

      setBalanceMinimo(balance);
      setNuevoBalanceMinimo('');
      setShowSettings(false);
      
      alert('Balance mínimo actualizado correctamente');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar balance mínimo');
    }
  };

  if (!showAlert) return null;

  return (
    <>
      {/* Alerta Principal */}
      <div className="bg-red-200 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="flex-shrink-0">
                <img src="/iconos/dollar.png" alt="Dollar" className='w-6 h-6' />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Alerta de Balance Bajo
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  Tu balance actual (${currentBalance.toLocaleString()}) está por debajo del mínimo establecido (${balanceMinimo.toLocaleString()}).
                </p>
                
               
                <p className="mt-1 font-semibold">
                  Recomendación: Revisa tus gastos o considera aumentar tus ingresos.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Configurar
          </button>
        </div>
      </div>

      {/* Modal de Configuración */}
      {showSettings && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-blue-200 to-indigo-90 border border-blue-200 rounded-lg p-8 text-center w-full max-w-md ">
            <h3 className="text-lg font-semibold mb-4">Configurar Alerta de Balance</h3>
            
            <form onSubmit={actualizarBalanceMinimo}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Mínimo de Alerta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={nuevoBalanceMinimo}
                    onChange={(e) => setNuevoBalanceMinimo(e.target.value)}
                    placeholder={balanceMinimo.toString()}
                    className="pl-7 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                  />
                </div>
                <p className="text-xs text-amber-50 mt-1">
                  Recibirás una alerta cuando tu balance sea menor a este valor.
                </p>
              </div>

              <div className="flex space-x-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r  from-blue-500 to-purple-500 hover:from-red -500 hover:to-green-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex px-3 py-1 "
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 bg-gradient-to-r  from-blue-500 to-purple-500 hover:from-red -500 hover:to-red-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg  bg-clip-tex text-white px-4 py-2 "
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BalanceAlert;