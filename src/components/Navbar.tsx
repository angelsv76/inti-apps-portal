import React from 'react';
import { Student } from '../types';
import { LogOut, Settings, GraduationCap } from 'lucide-react';

interface NavbarProps {
  student: Student | { nombre: string; grupo: string; nie: string };
  isAdmin: boolean;
  onLogout: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ student, isAdmin, onLogout, onOpenAdmin }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-inti-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <GraduationCap className="text-inti-yellow" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black text-inti-blue tracking-tight leading-none">INTI</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Portal Educativo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-sm font-bold text-slate-800">{student.nombre}</span>
              <span className="text-xs font-semibold text-inti-olive bg-inti-olive/10 px-2 py-0.5 rounded-full">
                {isAdmin ? 'Administrador' : `Grupo: ${student.grupo} • NIE: ${student.nie}`}
              </span>
            </div>
            
            {isAdmin && (
              <button 
                onClick={onOpenAdmin}
                className="p-2 text-slate-400 hover:text-inti-blue hover:bg-slate-50 rounded-xl transition-all"
                title="Panel de Administración"
              >
                <Settings size={22} />
              </button>
            )}
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
