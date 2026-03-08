import React from 'react';
import { motion } from 'motion/react';
import { EducationalApp } from '../types';
import * as LucideIcons from 'lucide-react';

interface AppCardProps {
  app: EducationalApp;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  // Dynamic icon selection from Lucide
  const IconComponent = (LucideIcons as any)[app.icono] || LucideIcons.AppWindow;
  const isActive = app.estado === 'activo';

  return (
    <motion.div
      whileHover={isActive ? { y: -5 } : {}}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 flex flex-col h-full ${!isActive ? 'opacity-80 grayscale-[0.5]' : ''}`}
    >
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${isActive ? 'bg-inti-blue/10 text-inti-blue' : 'bg-slate-100 text-slate-400'}`}>
            <IconComponent size={28} />
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wider ${isActive ? 'bg-inti-olive/10 text-inti-olive' : 'bg-slate-100 text-slate-500'}`}>
            {app.materia}
          </span>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>{app.nombre}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {app.descripcion}
        </p>
        
        {!isActive && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
            <LucideIcons.Construction className="text-amber-500 shrink-0" size={18} />
            <p className="text-xs font-bold text-amber-700 leading-tight">
              Se está trabajando en la app y próximamente estará disponible.
            </p>
          </div>
        )}
      </div>
      <div className="p-6 pt-0">
        {isActive ? (
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-inti-blue text-white font-bold rounded-xl hover:bg-blue-800 transition-colors group"
          >
            Abrir aplicación
            <LucideIcons.ExternalLink size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        ) : (
          <button
            disabled
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-slate-200 text-slate-400 font-bold rounded-xl cursor-not-allowed"
          >
            No disponible
          </button>
        )}
      </div>
    </motion.div>
  );
};
