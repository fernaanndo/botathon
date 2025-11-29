import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string; 
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, color = "text-teleton-red" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default relative overflow-hidden">
      
      {/* Decoracion */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-500 ${color.replace('text-', 'bg-')}`}></div>

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1 mb-1">{value}</h3>
          
          {/* Tendencia */}
          {trend && (
            <span className="inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-2">
              {trend}
            </span>
          )}
        </div>

        {/* Cont icono */}
        <div className={`p-3 rounded-xl bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-colors ${color}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}