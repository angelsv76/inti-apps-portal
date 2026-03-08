import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Student } from '../types';
import { GraduationCap, User, Hash, Users, ArrowLeft } from 'lucide-react';

interface LoginPanelProps {
  onLogin: (student: Student) => void;
  onBack: () => void;
  grupos: string[];
}

export const LoginPanel: React.FC<LoginPanelProps> = ({ onLogin, onBack, grupos }) => {
  const [formData, setFormData] = useState<Student>({
    nombre: '',
    nie: '',
    grupo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre && formData.nie && formData.grupo) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 inti-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-3xl p-8 shadow-2xl"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-inti-blue transition-colors mb-6 font-bold text-sm"
        >
          <ArrowLeft size={18} /> VOLVER
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-inti-yellow rounded-2xl mb-4 shadow-lg">
            <GraduationCap size={40} className="text-inti-blue" />
          </div>
          <h1 className="text-3xl font-black text-inti-blue tracking-tight">PORTAL INTI</h1>
          <p className="text-slate-500 font-medium mt-2 uppercase tracking-widest text-xs">Acceso Estudiantil</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nombre Completo</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                placeholder="Ej. Juan Pérez"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-inti-blue focus:border-transparent outline-none transition-all"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">NIE</label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                placeholder="Número de Identificación"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-inti-blue focus:border-transparent outline-none transition-all"
                value={formData.nie}
                onChange={(e) => setFormData({ ...formData, nie: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Código de Grupo</label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <select
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-inti-blue focus:border-transparent outline-none transition-all appearance-none"
                value={formData.grupo}
                onChange={(e) => setFormData({ ...formData, grupo: e.target.value })}
              >
                <option value="">Selecciona tu grupo</option>
                {grupos.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-inti-blue text-white font-black rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-800 hover:shadow-xl transition-all active:scale-95 mt-4"
          >
            INGRESAR AL PORTAL
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">
            Instituto Nacional Técnico Industrial
          </p>
        </div>
      </motion.div>
    </div>
  );
};
