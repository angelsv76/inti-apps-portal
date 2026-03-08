import { EducationalApp } from '../types';

export const INITIAL_APPS: EducationalApp[] = [
  {
    id: '1',
    nombre: 'ChefBot 3000',
    descripcion: 'Simulador de descomposición de problemas y algoritmos mediante recetas de cocina.',
    url: 'https://chefbot3000.vercel.app/',
    materia: 'Pensamiento Computacional',
    grupos: ['MA1B','ITSI1A','MA1A','MA1E','MA1F','DS1A','DS1D','MA1G','MA1H','MI1A','MI1B'],
    estado: 'activo',
    icono: 'Utensils'
  },
  {
    id: '2',
    nombre: 'Detective de Patrones',
    descripcion: 'Reconocimiento de patrones en pensamiento computacional y lógica.',
    url: 'https://detective-de-patrones.vercel.app/',
    materia: 'Lógica Matemática',
    grupos: ['MA1B','ITSI1A','MA1A','MA1E','MA1F','DS1A','DS1D','MA1G','MA1H','MI1A','MI1B'],
    estado: 'activo',
    icono: 'Search'
  },
  {
    id: '3',
    nombre: 'Abstracción Lab',
    descripcion: 'Identificación de elementos esenciales de un problema complejo.',
    url: 'https://abstraccion-lab.vercel.app',
    materia: 'Ingeniería de Software',
    grupos: ['ITSI1A', 'ITSI2A','ITSI3A'],
    estado: 'inactivo',
    icono: 'Layers'
  },
  {
    id: '4',
    nombre: 'Hardware Simulator',
    descripcion: 'Simulación interactiva de componentes internos de una computadora.',
    url: 'https://hardware-sim.vercel.app',
    materia: 'Arquitectura de Computadoras',
    grupos: ['ITSI1A', 'ITSI2A','ITSI3A'],
    estado: 'inactivo',
    icono: 'Cpu'
  },
  {
    id: '5',
    nombre: 'English Tech Lab',
    descripcion: 'Entrenamiento de vocabulario técnico especializado en inglés para IT.',
    url: 'https://english-tech-lab.vercel.app',
    materia: 'Inglés Técnico',
    grupos: ['DS1B'],
    estado: 'inactivo',
    icono: 'Languages'
  }
];
