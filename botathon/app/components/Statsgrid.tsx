"use client";
import React, { useEffect, useState } from 'react';
import { Users, MapPin, Award, Activity } from 'lucide-react';
import StatCard from './Statcard';

export default function StatsGrid() {
  // Estado inicial con valores en 0
  const [stats, setStats] = useState({
    total_voluntarios: 0,
    campana_actual: 2025, // Valor por defecto
    regiones_activas: 0,
    habilidades_unicas: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Función para pedir datos a la API de Fernando
    const fetchStats = async () => {
      try {
        // Asegúrate que la URL coincida con la de tu backend (ej: http://localhost:4000/api/stats)
        // Si usan Next.js API Routes, es '/api/stats'
        const res = await fetch('http://localhost:4000/api/stats'); 
        
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error("Error al cargar estadísticas");
        }
      } catch (error) {
        console.error("Error de conexión con el servidor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      
      <StatCard 
        title="Voluntarios Históricos"
        value={isLoading ? "..." : stats.total_voluntarios.toLocaleString()}
        icon={Users}
        trend={isLoading ? "Cargando..." : "Base de datos actualizada"}
        color="text-teleton-red"
      />

      <StatCard 
        title="Campaña Actual"
        value={stats.campana_actual}
        icon={Activity}
        trend="En curso"
        color="text-blue-600"
      />

      <StatCard 
        title="Regiones Activas"
        value={isLoading ? "..." : `${stats.regiones_activas} / 16`}
        icon={MapPin}
        trend="Cobertura Nacional"
        color="text-purple-600"
      />

      <StatCard 
        title="Habilidades Únicas"
        value={isLoading ? "..." : stats.habilidades_unicas}
        icon={Award}
        trend="Perfiles diversos"
        color="text-orange-500"
      />
    </div>
  );
}