import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, User, CreditCard, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [nombre, setNombre] = useState('');
  const [dui, setDui] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Credenciales específicas solicitadas por el usuario
    if (nombre === 'Angel Sanchez' && dui === '00623509-3') {
      onLogin(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-inti-blue transition-colors mb-6 font-bold text-sm"
        >
          <ArrowLeft size={18} /> VOLVER
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-inti-olive rounded-2xl mb-4 shadow-lg">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Acceso Administrativo</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Ingresa tus credenciales de docente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nombre</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                placeholder="Nombre del administrador"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-inti-olive focus:border-transparent outline-none transition-all"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">DUI</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                required
                type="text"
                placeholder="00000000-0"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-inti-olive focus:border-transparent outline-none transition-all"
                value={dui}
                onChange={(e) => setDui(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-500 text-sm font-bold text-center"
            >
              Credenciales incorrectas. Acceso denegado.
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-inti-olive text-white font-black rounded-2xl shadow-lg shadow-green-900/20 hover:bg-opacity-90 hover:shadow-xl transition-all active:scale-95 mt-4"
          >
            VERIFICAR IDENTIDAD
          </button>
        </form>
      </motion.div>
    </div>
  );
};
