import { Course } from '@/types';

export const availableCourses: Course[] = [
  {
    id: '1',
    title: 'Fundamentos de HTML y CSS',
    description: 'Aprende las bases del desarrollo web con HTML5 y CSS3. Perfecto para principiantes.',
    level: 'beginner',
    category: 'frontend',
    duration: '4 semanas',
    topics: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
    prerequisites: ['Ninguno']
  },
  {
    id: '2',
    title: 'JavaScript Moderno (ES6+)',
    description: 'Domina JavaScript desde lo básico hasta conceptos avanzados como async/await y módulos.',
    level: 'beginner',
    category: 'frontend',
    duration: '6 semanas',
    topics: ['Variables', 'Funciones', 'Arrays', 'Objetos', 'DOM', 'ES6+', 'Async/Await'],
    prerequisites: ['HTML básico', 'CSS básico']
  },
  {
    id: '3',
    title: 'Introducción a React.js',
    description: 'Aprende a crear interfaces de usuario dinámicas con React, la librería más popular de JavaScript.',
    level: 'intermediate',
    category: 'frontend',
    duration: '8 semanas',
    topics: ['Componentes', 'JSX', 'Props', 'State', 'Hooks', 'Router', 'Context'],
    prerequisites: ['JavaScript intermedio', 'HTML', 'CSS']
  },
  {
    id: '4',
    title: 'Desarrollo Backend con Node.js',
    description: 'Construye APIs robustas y servidores web con Node.js y Express.',
    level: 'intermediate',
    category: 'backend',
    duration: '6 semanas',
    topics: ['Node.js', 'Express', 'APIs REST', 'Middleware', 'Base de datos', 'Autenticación'],
    prerequisites: ['JavaScript intermedio']
  },
  {
    id: '5',
    title: 'Bases de Datos y SQL',
    description: 'Aprende a diseñar, crear y gestionar bases de datos relacionales con SQL.',
    level: 'beginner',
    category: 'backend',
    duration: '4 semanas',
    topics: ['SQL', 'MySQL', 'Diseño de BD', 'Consultas', 'Normalization', 'Índices'],
    prerequisites: ['Conceptos básicos de programación']
  },
  {
    id: '6',
    title: 'Desarrollo Full Stack',
    description: 'Combina frontend y backend para crear aplicaciones web completas.',
    level: 'advanced',
    category: 'fullstack',
    duration: '12 semanas',
    topics: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Deployment', 'Testing'],
    prerequisites: ['React intermedio', 'Node.js básico']
  },
  {
    id: '7',
    title: 'CSS Avanzado y Frameworks',
    description: 'Profundiza en CSS con animaciones, transformaciones y frameworks como Tailwind.',
    level: 'intermediate',
    category: 'frontend',
    duration: '5 semanas',
    topics: ['CSS Grid', 'Flexbox Avanzado', 'Animaciones', 'Sass', 'Tailwind CSS', 'Styled Components'],
    prerequisites: ['CSS básico', 'HTML intermedio']
  },
  {
    id: '8',
    title: 'Introducción al Desarrollo Web',
    description: 'Curso introductorio que cubre todos los conceptos básicos del desarrollo web.',
    level: 'beginner',
    category: 'frontend',
    duration: '3 semanas',
    topics: ['Internet', 'Navegadores', 'HTML básico', 'CSS básico', 'JavaScript básico'],
    prerequisites: ['Ninguno']
  },
  {
    id: '9',
    title: 'Algoritmos y Estructuras de Datos',
    description: 'Fortalece tus habilidades de programación con algoritmos fundamentales.',
    level: 'advanced',
    category: 'backend',
    duration: '8 semanas',
    topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Sorting', 'Searching'],
    prerequisites: ['JavaScript intermedio', 'Programación básica']
  },
  {
    id: '10',
    title: 'TypeScript para Desarrolladores JavaScript',
    description: 'Añade tipado estático a tus proyectos JavaScript con TypeScript.',
    level: 'intermediate',
    category: 'frontend',
    duration: '4 semanas',
    topics: ['Tipos', 'Interfaces', 'Generics', 'Decorators', 'Módulos', 'Configuración'],
    prerequisites: ['JavaScript avanzado']
  }
];
