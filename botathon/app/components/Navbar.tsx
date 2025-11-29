"use client";
import React, { useState } from 'react';
import Image from 'next/image'; 
import { Search, User, LogOut, Menu, Mail, MapPin, BadgeCheck } from 'lucide-react'; 

// 1. Definimos qué datos necesita el Navbar
interface UserData {
  name: string;      
  role: string;      
  email: string;     
  location: string;  
}

interface NavbarProps {
  user?: UserData; // Es opcional para que no falle si no cargan datos
}

// 2. Recibimos los datos en la función
export default function Navbar({ user = { name: "Admin", role: "Sede Central", email: "admin@teleton.cl", location: "General" } }: NavbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Estado para abrir/cerrar la tarjeta

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-r from-teleton-red via-red-600 to-red-700 shadow-xl opacity-95 backdrop-blur-md"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6"> 
          
          {/* Logo */}
          <div className="flex items-center gap-3 bg-white py-1.5 pl-1.5 pr-6 rounded-full shadow-xl min-w-fit cursor-pointer group transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="relative h-11 w-11 flex-shrink-0">
              <Image 
                src="/Logo2020a.png" // Asegúrate de que coincida con tu archivo
                alt="Logo Teletón" 
                fill             
                className="object-contain" 
                priority          
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-xl tracking-tight text-teleton-red drop-shadow-sm">
                TELETÓN
              </span>
              <span className="text-[10px] font-bold opacity-70 tracking-widest uppercase text-gray-600 group-hover:text-teleton-red transition-colors">
                Gestión de Voluntarios
              </span>
            </div>
          </div>

          {/* Busqueda */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-auto transition-all duration-300">
            <div className={`relative w-full group transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors duration-300 ${isSearchFocused ? 'text-teleton-red' : 'text-white/70'}`} />
              </div>
              <input
                type="text"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`block w-full pl-11 pr-4 py-2.5 rounded-full border-2 leading-5 
                  placeholder-gray-400 shadow-inner transition-all duration-300 ease-out font-medium
                  ${isSearchFocused 
                    ? 'bg-white text-gray-900 border-red-300 ring-4 ring-red-500/30 shadow-lg' 
                    : 'bg-red-800/40 text-white border-transparent placeholder-red-200 hover:bg-red-800/60'
                  }
                `}
                placeholder="Buscar voluntario por Nombre, RUT o Región..."
              />
            </div>
          </div>

          {/* PERFIL Y ACCIONES */}
          <div className="flex items-center gap-3 min-w-fit relative">

            {/* --- SECCIÓN DE USUARIO DINÁMICA --- */}
            <div 
              onClick={() => setIsProfileOpen(!isProfileOpen)} // Clic para abrir/cerrar
              className="hidden sm:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group backdrop-blur-sm relative"
            >
              <div className="bg-white text-teleton-red p-1 rounded-full group-hover:rotate-12 transition-transform">
                <User size={16} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col text-right">
                {/* AQUI USAMOS LOS PROPS */}
                <span className="text-sm font-bold text-white leading-none">{user.name}</span>
                <span className="text-[10px] text-red-100 opacity-80">{user.role}</span>
              </div>
            </div>

            {/* --- TARJETA FLOTANTE (DROPDOWN) DEL PERFIL --- */}
            {isProfileOpen && (
              <div className="absolute top-16 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                {/* Cabecera Roja */}
                <div className="bg-teleton-red p-4 text-white text-center">
                   <div className="h-16 w-16 bg-white rounded-full mx-auto flex items-center justify-center text-teleton-red text-2xl font-bold border-4 border-red-700/30">
                     {user.name.charAt(0)}
                   </div>
                   <h3 className="mt-2 font-bold text-lg">{user.name}</h3>
                   <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{user.role}</span>
                </div>
                
                {/* Datos del Usuario */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <Mail size={16} className="text-teleton-red" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <MapPin size={16} className="text-teleton-red" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <BadgeCheck size={16} className="text-green-600" />
                    <span>Cuenta Verificada</span>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                  <button className="text-xs text-red-500 hover:text-red-700 font-bold uppercase tracking-wide">
                    Ver Perfil Completo
                  </button>
                </div>
              </div>
            )}

            {/* Botón Salir */}
            <button 
              className="p-2.5 rounded-full text-white/90 hover:bg-white hover:text-teleton-red hover:shadow-lg hover:rotate-90 transition-all duration-300"
              title="Cerrar Sesión"
              onClick={() => window.location.href = '/'} // Redirige al login simple
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </div>
      
      {/* (Búsqueda Móvil Omitida para ahorrar espacio, ya la tienes en tu código) */}
    </nav>
  );
}