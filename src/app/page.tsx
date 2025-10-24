"use client";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import ImageSlider from "@/components/ImageSlider";
import Image from "next/image";

export default function HomePage() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen  bg-black/30 bg-opacity-70">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Logo y Título Principal */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
              <Image
                src="/iconos/finance-app.png" // Puedes usar tu logo aquí
                alt="Consejo Financiero"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Controla Tus 
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Finanzas</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            La herramienta perfecta para estudiantes que quieren tomar el control de su economía personal
          </p>
        </div>

        <ImageSlider/>

        {/* Mensaje Personalizado */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto mb-12">
          <p className="text-white text-lg mb-4">
            {user
              ? `¡Hola, ${user.nombre}! Estamos felices de verte nuevamente.`
              : "Comienza tu journey financiero hoy mismo"}
          </p>
          <div className="mt-6">
            {user ? (
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Image
                  src="/iconos/dashboard.png"
                  alt="Dashboard"
                  width={20}
                  height={20}
                  className="mr-2 invert"
                />
                Ir al Panel de Control
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/register" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Image
                    src="/iconos/register.png"
                    alt="Registrarse"
                    width={20}
                    height={20}
                    className="mr-2 invert"
                  />
                  Crear Cuenta Gratis
                </Link>
                <Link 
                  href="/login" 
                  className="inline-flex items-center justify-center bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 border border-white/30"
                >
                  <Image
                    src="/iconos/login.png"
                    alt="Iniciar Sesión"
                    width={20}
                    height={20}
                    className="mr-2 invert"
                  />
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sección de Objetivos */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image
                src="/iconos/tracking.png"
                alt="Seguimiento"
                width={32}
                height={32}
                className="invert"
              />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Seguimiento Detallado</h3>
            <p className="text-gray-300">
              Registra cada gasto e ingreso para entender exactamente en qué se va tu dinero
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image
                src="/iconos/categories.png"
                alt="Categorización"
                width={32}
                height={32}
                className="invert"
              />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Categorización Inteligente</h3>
            <p className="text-gray-300">
              Organiza tus transacciones por categorías y identifica patrones de gasto
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image
                src="/iconos/analytics.png"
                alt="Análisis"
                width={32}
                height={32}
                className="invert"
              />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">Análisis en Tiempo Real</h3>
            <p className="text-gray-300">
              Visualiza tu balance y recibe alertas cuando necesites ajustar tus gastos
            </p>
          </div>
        </div>

        {/* Sección de Información Institucional */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Proyecto Educativo</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4"> Nuestro Objetivo</h3>
              <p className="text-gray-300 mb-4">
                Esta aplicación fue diseñada específicamente para ayudar a los estudiantes a desarrollar 
                <strong className="text-cyan-300"> hábitos financieros saludables</strong> desde temprana edad.
              </p>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <Image
                    src="/iconos/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="mr-2 invert"
                  />
                  Control total sobre ingresos y gastos
                </li>
                <li className="flex items-center">
                  <Image
                    src="/iconos/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="mr-2 invert"
                  />
                  Identificación de gastos innecesarios
                </li>
                <li className="flex items-center">
                  <Image
                    src="/iconos/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="mr-2 invert"
                  />
                  Planificación para metas futuras
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3">Desarrollado por</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-cyan-300 font-bold">CESDE</h4>
                    <p className="text-gray-300 text-sm">Centro de Estudios Especializados</p>
                    <p className="text-gray-400 text-xs mt-1">Sede Bello, Antioquia</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-300 text-sm">
                      Estudiantes de último semestre de tecnología
                    </p>
                    <p className="text-cyan-300 text-xs mt-1">
                      Proyecto de desarrollo web con React
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="text-center mt-12">
          <p className= "text-white text-sm mb-4">
            ¿Listo para tomar el control de tus finanzas?
          </p>
          {!user && (
            <Link 
              href="/register" 
              className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Image
                src="/iconos/rocket.png"
                alt="Comenzar"
                width={20}
                height={20}
                className="mr-2 invert"
              />
              Comenzar Ahora Es Gratis!
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Consejo Financiero - Proyecto educativo del CESDE Sede Bello
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Desarrollado  por estudiantes para estudiantes
          </p>
        </div>
      </footer>
    </div>
  );
}