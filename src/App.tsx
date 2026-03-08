import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EducationalApp, Student, ViewState } from './types';
import { INITIAL_APPS } from './data/apps';
import { DEFAULT_GROUPS } from './data/groups';
import { RoleSelection } from './components/RoleSelection';
import { LoginPanel } from './components/LoginPanel';
import { AdminLogin } from './components/AdminLogin';
import { AppCard } from './components/AppCard';
import { Navbar } from './components/Navbar';
import { AdminPanel } from './components/AdminPanel';
import { LayoutGrid, Search, AlertCircle } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('role-selection');
  const [student, setStudent] = useState<Student | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [apps, setApps] = useState<EducationalApp[]>([]);
  const [grupos, setGrupos] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Initialize apps and groups from localStorage or initial data
  useEffect(() => {
    const savedApps = localStorage.getItem('inti_portal_apps');
    if (savedApps) {
      setApps(JSON.parse(savedApps));
    } else {
      setApps(INITIAL_APPS);
      localStorage.setItem('inti_portal_apps', JSON.stringify(INITIAL_APPS));
    }

    const savedGroups = localStorage.getItem('inti_portal_groups');
    if (savedGroups) {
      setGrupos(JSON.parse(savedGroups));
    } else {
      setGrupos(DEFAULT_GROUPS);
      localStorage.setItem('inti_portal_groups', JSON.stringify(DEFAULT_GROUPS));
    }

    // Check for existing session
    const savedStudent = localStorage.getItem('inti_portal_student');
    const savedAdmin = localStorage.getItem('inti_portal_admin');

    if (savedAdmin === 'true') {
      setIsAdmin(true);
      setView('portal');
    } else if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
      setView('portal');
    }
  }, []);

  const handleLogin = (studentData: Student) => {
    setStudent(studentData);
    setIsAdmin(false);
    localStorage.setItem('inti_portal_student', JSON.stringify(studentData));
    localStorage.removeItem('inti_portal_admin');
    setView('portal');
  };

  const handleAdminLogin = (success: boolean) => {
    if (success) {
      setIsAdmin(true);
      setStudent({ nombre: 'Angel Sanchez', nie: '00623509-3', grupo: 'ADMIN' });
      localStorage.setItem('inti_portal_admin', 'true');
      localStorage.removeItem('inti_portal_student');
      setView('portal');
    }
  };

  const handleLogout = () => {
    setStudent(null);
    setIsAdmin(false);
    localStorage.removeItem('inti_portal_student');
    localStorage.removeItem('inti_portal_admin');
    setView('role-selection');
  };

  const updateApps = (newApps: EducationalApp[]) => {
    setApps(newApps);
    localStorage.setItem('inti_portal_apps', JSON.stringify(newApps));
  };

  const updateGrupos = (newGroups: string[]) => {
    setGrupos(newGroups);
    localStorage.setItem('inti_portal_groups', JSON.stringify(newGroups));
  };

  const filteredApps = apps.filter(app => {
    // Admins see all apps, students only their group's (including inactive ones to show 'Coming Soon')
    const matchesGroup = isAdmin || (student ? app.grupos.includes(student.grupo) : false);
    const matchesSearch = app.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.materia.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  if (view === 'role-selection') {
    return <RoleSelection onSelect={(role) => setView(role === 'student' ? 'login' : 'admin-login')} />;
  }

  if (view === 'login') {
    return <LoginPanel onLogin={handleLogin} onBack={() => setView('role-selection')} grupos={grupos} />;
  }

  if (view === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} onBack={() => setView('role-selection')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {student && (
        <Navbar 
          student={student} 
          isAdmin={isAdmin}
          onLogout={handleLogout} 
          onOpenAdmin={() => setShowAdminPanel(true)} 
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <LayoutGrid className="text-inti-blue" size={24} />
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                {isAdmin ? 'Panel de Control' : 'Mis Aplicaciones'}
              </h2>
            </motion.div>
            <p className="text-slate-500 font-medium">
              Bienvenido, <span className="text-inti-blue font-bold">{student?.nombre}</span>. 
              {isAdmin ? ' Tienes acceso total a la gestión del portal.' : ' Estas son las herramientas disponibles para tu grupo.'}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Buscar aplicación o materia..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-inti-blue focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredApps.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <AlertCircle size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No se encontraron aplicaciones</h3>
              <p className="text-slate-500 mt-2 max-w-xs">
                {isAdmin 
                  ? 'No hay aplicaciones registradas en el sistema.' 
                  : `No hay aplicaciones activas asignadas a tu grupo (${student?.grupo}) que coincidan con tu búsqueda.`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-auto py-10 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
            Instituto Nacional Técnico Industrial • El Salvador
          </p>
          <p className="text-xs text-slate-300 mt-2">
            &copy; {new Date().getFullYear()} Portal Educativo de Aplicaciones. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {showAdminPanel && isAdmin && (
        <AdminPanel 
          apps={apps} 
          grupos={grupos}
          onUpdateApps={updateApps} 
          onUpdateGrupos={updateGrupos}
          onClose={() => setShowAdminPanel(false)} 
        />
      )}
    </div>
  );
}

