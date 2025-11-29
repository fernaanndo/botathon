"use client";
import React from 'react';
import Navbar from '../../components/Navbar'; // Ajusta la ruta si es necesario
import VolunteersTable from '../../components/VolunteersTable'; // Importamos la tabla real
import { Users, Calendar, CheckCircle, MapPin } from 'lucide-react';

export default function JefeDashboard() {

  // 1. Definimos los datos del Usuario "Jefe" para el Navbar
  const jefeUser = {
    name: "Jefe Gestión V",
    role: "Instituto Valparaíso",
    email: "jefe.valpo@teleton.cl",
    location: "Av. Francia, Valparaíso"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 2. Pasamos los datos al Navbar */}
      <Navbar user={jefeUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabecera de la Página */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Instituto: Valparaíso</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <MapPin size={16} /> Gestión Local de Voluntarios
            </p>
          </div>
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
            Región V
          </span>
        </div>

        {/* 3. Tarjetas de Métricas Locales (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Tarjeta 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teleton-red hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Voluntarios Valparaíso</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">450</h3>
              </div>
              <div className="bg-red-50 p-3 rounded-full text-teleton-red">
                <Users size={24} />
              </div>
            </div>
          </div>
          
          {/* Tarjeta 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Asistencia Turnos</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">85%</h3>
              </div>
              <div className="bg-blue-50 p-3 rounded-full text-blue-500">
                <Calendar size={24} />
              </div>
            </div>
          </div>

          {/* Tarjeta 3 (Agregada para balancear el diseño) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Voluntarios Activos</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">42</h3>
              </div>
              <div className="bg-green-50 p-3 rounded-full text-green-500">
                <CheckCircle size={24} />
              </div>
            </div>
          </div>

        </div>

        {/* 4. Tabla de Voluntarios Real */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Nómina de Voluntarios</h2>
            <button className="text-sm text-teleton-red font-semibold hover:underline">
              Exportar CSV
            </button>
          </div>
          
          {/* Componente de Tabla insertado */}
          <VolunteersTable />
        </div>

      </main>
    </div>
  );
}