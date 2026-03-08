import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EducationalApp } from '../types';
import { Plus, Trash2, Edit2, X, Save, Power, PowerOff, LayoutGrid } from 'lucide-react';

interface AdminPanelProps {
  apps: EducationalApp[];
  grupos: string[];
  onUpdateApps: (apps: EducationalApp[]) => void;
  onUpdateGrupos: (grupos: string[]) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ apps, grupos, onUpdateApps, onUpdateGrupos, onClose }) => {
  const [editingApp, setEditingApp] = useState<EducationalApp | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [activeTab, setActiveTab] = useState<'apps' | 'groups'>('apps');

  const handleDeleteGroup = (group: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el grupo ${group}?`)) {
      onUpdateGrupos(grupos.filter(g => g !== group));
    }
  };

  const handleAddGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName && !grupos.includes(newGroupName)) {
      onUpdateGrupos([...grupos, newGroupName.toUpperCase()]);
      setNewGroupName('');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta aplicación?')) {
      onUpdateApps(apps.filter(app => app.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    onUpdateApps(apps.map(app => 
      app.id === id ? { ...app, estado: app.estado === 'activo' ? 'inactivo' : 'activo' } : app
    ));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    if (isAdding) {
      onUpdateApps([...apps, { ...editingApp, id: Date.now().toString() }]);
    } else {
      onUpdateApps(apps.map(app => app.id === editingApp.id ? editingApp : app));
    }
    setEditingApp(null);
    setIsAdding(false);
  };

  const startEdit = (app: EducationalApp) => {
    setEditingApp(app);
    setIsAdding(false);
  };

  const startAdd = () => {
    setEditingApp({
      id: '',
      nombre: '',
      descripcion: '',
      url: '',
      materia: '',
      grupos: [],
      estado: 'activo',
      icono: 'AppWindow'
    });
    setIsAdding(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-inti-blue text-white">
          <div className="flex items-center gap-3">
            <LayoutGrid size={24} />
            <h2 className="text-xl font-bold">Panel de Administración Docente</h2>
          </div>
          <div className="flex bg-white/10 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab('apps')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'apps' ? 'bg-white text-inti-blue shadow-sm' : 'hover:bg-white/10'}`}
            >
              Aplicaciones
            </button>
            <button 
              onClick={() => setActiveTab('groups')}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'groups' ? 'bg-white text-inti-blue shadow-sm' : 'hover:bg-white/10'}`}
            >
              Grupos
            </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'apps' ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Gestión de Aplicaciones</h3>
                <button 
                  onClick={startAdd}
                  className="flex items-center gap-2 px-4 py-2 bg-inti-olive text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                >
                  <Plus size={20} /> Nueva Aplicación
                </button>
              </div>

              <div className="grid gap-4">
                {apps.map(app => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${app.estado === 'activo' ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}>
                        {app.estado === 'activo' ? <Power size={20} /> : <PowerOff size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{app.nombre}</h4>
                        <p className="text-xs text-slate-500">{app.materia} • {app.grupos.join(', ')}</p>
                        {app.estado === 'inactivo' && (
                          <p className="text-[10px] font-bold text-amber-600 uppercase mt-1">
                            🚧 Se está trabajando en la app y próximamente estará disponible
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleToggleStatus(app.id)}
                        className={`p-2 rounded-lg transition-colors ${app.estado === 'activo' ? 'text-green-600 hover:bg-green-50' : 'text-slate-400 hover:bg-slate-200'}`}
                        title={app.estado === 'activo' ? 'Desactivar' : 'Activar'}
                      >
                        {app.estado === 'activo' ? <Power size={20} /> : <PowerOff size={20} />}
                      </button>
                      <button 
                        onClick={() => startEdit(app)}
                        className="p-2 text-inti-blue hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Gestión de Grupos/Secciones</h3>
              </div>

              <form onSubmit={handleAddGroup} className="mb-8 flex gap-3">
                <input 
                  type="text"
                  placeholder="Nuevo código de grupo (ej. DS1C)"
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-inti-blue"
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-inti-olive text-white rounded-2xl font-bold hover:bg-opacity-90 transition-all flex items-center gap-2"
                >
                  <Plus size={20} /> Agregar Grupo
                </button>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {grupos.map(group => (
                  <div key={group} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                    <span className="font-bold text-slate-700">{group}</span>
                    <button 
                      onClick={() => handleDeleteGroup(group)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      title="Eliminar grupo"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {editingApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-800">
                  {isAdding ? 'Agregar Nueva Aplicación' : 'Editar Aplicación'}
                </h3>
                <button onClick={() => setEditingApp(null)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nombre</label>
                    <input 
                      required
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-inti-blue"
                      value={editingApp.nombre}
                      onChange={e => setEditingApp({...editingApp, nombre: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Descripción</label>
                    <textarea 
                      required
                      rows={2}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-inti-blue"
                      value={editingApp.descripcion}
                      onChange={e => setEditingApp({...editingApp, descripcion: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">URL</label>
                    <input 
                      required
                      type="url"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-inti-blue"
                      value={editingApp.url}
                      onChange={e => setEditingApp({...editingApp, url: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Materia</label>
                    <input 
                      required
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-inti-blue"
                      value={editingApp.materia}
                      onChange={e => setEditingApp({...editingApp, materia: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Icono (Lucide Name)</label>
                    <input 
                      required
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-inti-blue"
                      value={editingApp.icono}
                      onChange={e => setEditingApp({...editingApp, icono: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Grupos (separados por coma)</label>
                    <input 
                      required
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-inti-blue"
                      value={editingApp.grupos.join(', ')}
                      onChange={e => setEditingApp({...editingApp, grupos: e.target.value.split(',').map(s => s.trim())})}
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingApp(null)}
                    className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-3 bg-inti-blue text-white font-bold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={20} /> Guardar Cambios
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
