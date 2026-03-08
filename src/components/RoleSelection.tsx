import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ShieldCheck, UserCircle } from 'lucide-react';

interface RoleSelectionProps {
  onSelect: (role: 'student' | 'admin') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 inti-gradient">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full glass-card rounded-3xl p-10 shadow-2xl text-center"
      >
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-inti-yellow rounded-2xl mb-4 shadow-lg">
            <GraduationCap size={40} className="text-inti-blue" />
          </div>
          <h1 className="text-4xl font-black text-inti-blue tracking-tight">PORTAL INTI</h1>
          <p className="text-slate-500 font-medium mt-2 uppercase tracking-widest text-sm">Bienvenido al Sistema Educativo</p>
        </div>

        <h2 className="text-xl font-bold text-slate-700 mb-8">¿Cómo deseas ingresar?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect('student')}
            className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm hover:border-inti-blue hover:shadow-xl transition-all group text-center"
          >
            <div className="w-16 h-16 bg-inti-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-inti-blue group-hover:bg-inti-blue group-hover:text-white transition-colors">
              <UserCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Alumno</h3>
            <p className="text-sm text-slate-500">Accede a tus aplicaciones y herramientas de estudio.</p>
          </motion.button>

          <motion.button
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect('admin')}
            className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm hover:border-inti-olive hover:shadow-xl transition-all group text-center"
          >
            <div className="w-16 h-16 bg-inti-olive/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-inti-olive group-hover:bg-inti-olive group-hover:text-white transition-colors">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Administrador</h3>
            <p className="text-sm text-slate-500">Gestiona el catálogo de aplicaciones y grupos.</p>
          </motion.button>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Instituto Nacional Técnico Industrial • El Salvador
          </p>
        </div>
      </motion.div>
    </div>
  );
};
