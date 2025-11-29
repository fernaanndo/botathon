"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar información del usuario (opcional: en localStorage o contexto)
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirigir según el rol del usuario
        const rol = data.user.rol?.toLowerCase().trim() || '';
        console.log('Rol recibido del backend:', data.user.rol, '-> Normalizado:', rol);
        
        // Verificar si es director
        if (rol.includes('director')) {
          router.push('/Dashboard/Director');
        } 
        // Verificar si es jefe de gestión o jefe
        else if (rol.includes('jefe de gestion') || rol.includes('jefe de gestión') || rol.includes('jefe')) {
          router.push('/Dashboard/Jefe');
        } 
        // Si no hay un rol específico, redirigir a una página por defecto
        else {
          console.warn('Rol no reconocido:', data.user.rol);
          setError(`Rol no reconocido: ${data.user.rol}. Contacta al administrador.`);
          setIsLoading(false);
        }
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error de conexión. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-teleton-red to-red-900 opacity-90 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-0"></div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="h-20 w-20 relative mb-4">
            <Image src="/Logo2020a.png" alt="Teletón" fill className="object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido al CRM</h2>
          <p className="text-gray-500 text-sm">Gestión de Voluntarios Teletón</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Institucional</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ej: director@teleton.cl"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teleton-red focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teleton-red focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-teleton-red text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Iniciando sesión...
              </>
            ) : (
              <>
                Iniciar Sesión <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Botathon 2025 | Duoc UC</p>
        </div>
      </div>
    </main>
  );
}