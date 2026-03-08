export interface EducationalApp {
  id: string;
  nombre: string;
  descripcion: string;
  url: string;
  materia: string;
  grupos: string[];
  estado: 'activo' | 'inactivo';
  icono: string;
}

export interface Student {
  nombre: string;
  nie: string;
  grupo: string;
}

export type ViewState = 'role-selection' | 'login' | 'admin-login' | 'portal' | 'admin';
