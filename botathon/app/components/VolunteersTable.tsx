"use client";
import React, { useEffect, useState } from 'react';
import { MoreHorizontal, MapPin, User, Loader2 } from 'lucide-react';

// Definimos la estructura del voluntario que viene de la DB
interface Volunteer {
  id: number;
  nombre: string;
  rut: string;
  rol: string;      // O "habilidad_principal"
  estado: string;
  region: string;
  email?: string;
}

export default function VolunteersTable() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // Petición a la API de Fernando
        // Ajustar puerto si es necesario (ej: 4000, 3001, 8080)
        const res = await fetch('http://localhost:4000/api/volunteers');
        
        if (res.ok) {
          const data = await res.json();
          setVolunteers(data);
        }
      } catch (error) {
        console.error("Error cargando tabla:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 text-teleton-red">
        <Loader2 className="animate-spin h-8 w-8" />
        <span className="ml-2 font-medium">Cargando datos de voluntarios...</span>
      </div>
    );
  }

  if (volunteers.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
        No se encontraron voluntarios en la base de datos.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm whitespace-nowrap">
        <thead className="uppercase tracking-wider border-b-2 border-gray-100 bg-gray-50">
          <tr>
            <th className="px-6 py-4 font-semibold text-gray-600">Voluntario</th>
            <th className="px-6 py-4 font-semibold text-gray-600">RUT</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Rol / Habilidad</th>
            <th className="px-6 py-4 font-semibold text-gray-600">Estado</th>
            <th className="px-6 py-4 font-semibold text-gray-600 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((vol) => (
            <tr key={vol.id} className="border-b border-gray-100 hover:bg-red-50/50 transition-colors group">
              
              {/* Columna Nombre y Región */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold group-hover:bg-white group-hover:text-teleton-red group-hover:shadow-sm transition-all">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{vol.nombre}</div>
                    <div className="text-gray-500 text-xs flex items-center gap-1">
                       <MapPin size={10} /> {vol.region}
                    </div>
                  </div>
                </div>
              </td>

              {/* Columna RUT */}
              <td className="px-6 py-4 text-gray-500 font-mono">{vol.rut}</td>

              {/* Columna Rol */}
              <td className="px-6 py-4">
                <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold border border-blue-100">
                  {vol.rol || "Voluntario General"}
                </span>
              </td>

              {/* Columna Estado */}
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  vol.estado === 'Activo' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                  {vol.estado || "Activo"}
                </span>
              </td>

              {/* Acciones */}
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-teleton-red transition-colors p-2 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}