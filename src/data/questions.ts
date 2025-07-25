import { Question } from '@/types';

export const assessmentQuestions: Question[] = [
  {
    id: '1',
    question: '¿Cuál es la estructura básica correcta de un documento HTML?',
    options: [
      '&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;',
      '&lt;html&gt;&lt;body&gt;&lt;head&gt;&lt;/head&gt;&lt;/body&gt;&lt;/html&gt;',
      '&lt;head&gt;&lt;body&gt;&lt;html&gt;&lt;/html&gt;&lt;/body&gt;&lt;/head&gt;',
      '&lt;body&gt;&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;/html&gt;&lt;/body&gt;'
    ],
    correctAnswer: 0,
    category: 'html',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: '¿Qué propiedad CSS se utiliza para cambiar el color de fondo de un elemento?',
    options: [
      'color',
      'background-color',
      'bgcolor',
      'background'
    ],
    correctAnswer: 1,
    category: 'css',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: '¿Cuál es la forma correcta de declarar una variable en JavaScript moderno (ES6+)?',
    options: [
      'var miVariable = "valor";',
      'let miVariable = "valor";',
      'const miVariable = "valor";',
      'Todas las anteriores son válidas'
    ],
    correctAnswer: 3,
    category: 'javascript',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: '¿Qué etiqueta HTML se utiliza para crear un enlace?',
    options: [
      '&lt;link&gt;',
      '&lt;a&gt;',
      '&lt;href&gt;',
      '&lt;url&gt;'
    ],
    correctAnswer: 1,
    category: 'html',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: '¿Cuál es la diferencia principal entre "let" y "const" en JavaScript?',
    options: [
      'No hay diferencia',
      'let es para números, const para texto',
      'const no puede ser reasignado después de la declaración',
      'let solo funciona en funciones'
    ],
    correctAnswer: 2,
    category: 'javascript',
    difficulty: 'medium'
  },
  {
    id: '6',
    question: '¿Qué significa CSS?',
    options: [
      'Computer Style Sheets',
      'Creative Style Sheets',
      'Cascading Style Sheets',
      'Colorful Style Sheets'
    ],
    correctAnswer: 2,
    category: 'css',
    difficulty: 'easy'
  },
  {
    id: '7',
    question: '¿Cuál es el método correcto para seleccionar un elemento por su ID en JavaScript?',
    options: [
      'document.getElementById("miId")',
      'document.getElement("miId")',
      'document.querySelector("#miId")',
      'Ambas A y C son correctas'
    ],
    correctAnswer: 3,
    category: 'javascript',
    difficulty: 'medium'
  },
  {
    id: '8',
    question: '¿Qué propiedad CSS se utiliza para hacer que un elemento sea responsive?',
    options: [
      'responsive',
      'media-query',
      'max-width',
      'flex'
    ],
    correctAnswer: 2,
    category: 'css',
    difficulty: 'medium'
  },
  {
    id: '9',
    question: '¿Cuál es la etiqueta HTML correcta para el encabezado más importante?',
    options: [
      '&lt;header&gt;',
      '&lt;h1&gt;',
      '&lt;head&gt;',
      '&lt;title&gt;'
    ],
    correctAnswer: 1,
    category: 'html',
    difficulty: 'easy'
  },
  {
    id: '10',
    question: '¿Qué es una función arrow en JavaScript?',
    options: [
      'Una función que apunta hacia arriba',
      'Una sintaxis más corta para escribir funciones: () => {}',
      'Una función que solo funciona con arrays',
      'Una función especial para eventos'
    ],
    correctAnswer: 1,
    category: 'javascript',
    difficulty: 'hard'
  }
];
