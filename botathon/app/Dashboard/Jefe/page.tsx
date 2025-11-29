"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar'; // Ajusta la ruta si es necesario
import VolunteersTable from '../../components/VolunteersTable'; // Importamos la tabla real
import { Users, Calendar, CheckCircle, MapPin, Loader2 } from 'lucide-react';

interface Instituto {
  Id: number;
  nombre?: string;
  direccion?: string;
  region?: string;
  ciudad?: string;
  [key: string]: any; // Para otros campos que puedan venir
}

interface User {
  id: number;
  email: string;
  rol: string;
  institutoId: number;
}

export default function JefeDashboard() {
  const [instituto, setInstituto] = useState<Instituto | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener información del usuario del localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      setError('No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
      setIsLoading(false);
      return;
    }

    try {
      const parsedUser: User = JSON.parse(userData);
      setUser(parsedUser);

      // Obtener información del instituto usando el institutoId
      if (parsedUser.institutoId) {
        fetch(`http://localhost:3001/api/instituto/${parsedUser.institutoId}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setInstituto(data.instituto);
            } else {
              setError(data.message || 'Error al cargar información del instituto');
            }
          })
          .catch(err => {
            console.error('Error al obtener información del instituto:', err);
            setError('Error de conexión al obtener información del instituto');
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setError('No se encontró ID del instituto');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error al parsear datos del usuario:', err);
      setError('Error al leer información del usuario');
      setIsLoading(false);
    }
  }, []);

  // Datos del usuario para el Navbar (usando información real cuando esté disponible)
  const jefeUser = {
    name: user?.email?.split('@')[0] || "Jefe de Gestión",
    role: instituto?.Nombre || "Cargando...",
    email: user?.email || "",
    location: instituto?.DireccionInstituto || instituto?.ciudad || "Cargando..."
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-teleton-red mx-auto mb-4" />
          <p className="text-gray-600">Cargando información del instituto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <p className="text-red-600 font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-teleton-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Volver al Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 2. Pasamos los datos al Navbar */}
      <Navbar user={jefeUser} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabecera de la Página */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Instituto: {instituto?.Nombre || 'Sin nombre'}
            </h1>
            <p className="text-gray-500 flex items-center gap-2">
              <MapPin size={16} /> 
              {instituto?.direccion || instituto?.ciudad || 'Gestión Local de Voluntarios'}
            </p>
          </div>
          {instituto?.region && (
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
              {instituto.region}
            </span>
          )}
        </div>

        {/* 3. Tarjetas de Métricas Locales (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Tarjeta 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teleton-red hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Voluntarios {instituto?.nombre || 'Instituto'}
                </p>
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