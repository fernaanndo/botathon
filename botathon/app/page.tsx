"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.includes('director')) {
      router.push('/Dashboard/Director');
    } else if (email.includes('jefe')) {
      router.push('/Dashboard/Jefe');   
    } else {
      setError('Usuario no reconocido.');
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
            className="w-full bg-teleton-red text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Iniciar Sesión <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">Botathon 2025 | Duoc UC</p>
        </div>
      </div>
    </main>
  );
}