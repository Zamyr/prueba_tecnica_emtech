# 📚 Plataforma de Cursos en Línea - EduTech Academy

Aplicación web fullstack desarrollada con Next.js para evaluación técnica de competencias en desarrollo web.

## 🚀 Características Principales

- **Landing Page Atractiva**: Página de inicio con diseño responsive y moderno
- **Registro de Estudiantes**: Formulario con validación usando React Hook Form y Zod
- **Assessment Interactivo**: Evaluación de 10 preguntas sobre desarrollo web
- **Resultados Personalizados**: Puntuación detallada con análisis de rendimiento
- **Recomendaciones Inteligentes**: Cursos sugeridos basados en el desempeño
- **Generación de Reportes**: Descarga de reporte en formato texto
- **Diseño Responsive**: Optimizado para dispositivos móviles y desktop

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos utilitarios
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Lucide React** - Iconos modernos

### Backend
- **Next.js API Routes** - Endpoints serverless
- **Prisma ORM** - Base de datos (configurado para MySQL)
- **Node.js** - Runtime JavaScript

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Turbopack** - Bundler ultrarrápido

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Layout principal
│   ├── globals.css        # Estilos globales
│   ├── registro/          # Página de registro
│   ├── assessment/        # Página de evaluación
│   ├── resultados/        # Página de resultados
│   └── api/              # API Routes
│       ├── students/      # Endpoints de estudiantes
│       └── assessment/    # Endpoints de evaluación
├── components/            # Componentes reutilizables
├── data/                  # Datos mock
│   ├── questions.ts       # Preguntas del assessment
│   └── courses.ts         # Catálogo de cursos
├── lib/                   # Utilidades y lógica de negocio
│   ├── utils.ts          # Utilidades generales
│   └── assessment.ts     # Lógica de evaluación
└── types/                # Definiciones TypeScript
    └── index.ts          # Interfaces principales
```

## 🎯 Funcionalidades Implementadas

### 1. Landing Page
- Diseño atractivo con gradientes y animaciones
- Sección de hero con CTA claro
- Información sobre la plataforma
- Testimonios y estadísticas
- Footer completo

### 2. Registro de Estudiantes
- Formulario con validación en tiempo real
- Campos: nombre, email, edad, nivel educativo
- Manejo de errores y estados de carga
- Navegación automática al assessment

### 3. Assessment Interactivo
- 10 preguntas sobre desarrollo web (HTML, CSS, JavaScript)
- Navegación entre preguntas (siguiente/anterior)
- Barra de progreso visual
- Timer automático
- Prevención de pérdida de datos

### 4. Sistema de Resultados
- Cálculo automático de puntuación
- Análisis de rendimiento (Excelente/Bueno/Regular/Necesita Mejorar)
- Recomendaciones personalizadas de cursos
- Estadísticas detalladas (tiempo, respuestas correctas)

### 5. Recomendaciones Inteligentes
- Algoritmo basado en puntuación obtenida
- Cursos categorizados por nivel de dificultad
- Información detallada de cada curso recomendado
- Priorización de recomendaciones

### 6. Generación de Reportes
- Reporte completo en formato texto
- Incluye resultados, recomendaciones y próximos pasos
- Descarga automática con nombre personalizado

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd prueba_tecnica
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🗄️ Base de Datos (Opcional)

El proyecto incluye configuración de Prisma para MySQL:

```bash
# Inicializar base de datos
npx prisma migrate dev

# Ver base de datos
npx prisma studio
```

## 📖 Uso de la Aplicación

1. **Inicio**: Visita la landing page y conoce la plataforma
2. **Registro**: Regístrate proporcionando tus datos básicos
3. **Assessment**: Completa la evaluación de 10 preguntas
4. **Resultados**: Revisa tu puntuación y recomendaciones
5. **Reporte**: Descarga tu reporte personalizado

## 🎨 Diseño y UX

- **Responsive Design**: Adaptado para móviles, tablets y desktop
- **Paleta de Colores**: Azul y púrpura con gradientes suaves
- **Tipografía**: Fuentes modernas y legibles
- **Iconografía**: Lucide React para iconos consistentes
- **Animaciones**: Transiciones suaves y estados de carga

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Construcción para producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos TypeScript
```

## 🧪 Testing

### Flujo de Testing Manual
1. Registro de estudiante con datos válidos e inválidos
2. Navegación completa del assessment
3. Verificación de cálculo de puntuaciones
4. Validación de recomendaciones por nivel
5. Descarga y verificación de reportes

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker build -t edutech-academy .
docker run -p 3000:3000 edutech-academy
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

**Desarrollado por**: [Tu Nombre]
**Email**: [tu-email@example.com]
**LinkedIn**: [tu-linkedin]

---

*Desarrollado usando Next.js y TypeScript*
