<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 🎓 Plataforma de Cursos en Línea - Instrucciones para Copilot

## Contexto del Proyecto
Este es un proyecto de prueba técnica para una plataforma de cursos en línea open source. La aplicación permite a estudiantes:
- Explorar una landing page informativa
- Registrarse como nuevos estudiantes
- Realizar un assessment de 10 preguntas sobre programación web básica
- Recibir resultados personalizados y recomendaciones de cursos
- Descargar un informe en PDF con sus resultados

## Stack Tecnológico
- **Frontend**: Next.js 15 con TypeScript, Tailwind CSS, App Router
- **Backend**: Next.js API Routes (implementado) con Prisma ORM
- **Base de Datos**: MySQL configurado con Prisma
- **Arquitectura**: Mono repositorio con API Routes como backend principal

## Instrucciones Específicas
1. **Siempre usa TypeScript** con tipos explícitos y interfaces bien definidas
2. **Componentes**: Crea componentes reutilizables con Tailwind CSS
3. **API Routes**: Usar las API routes de Next.js como backend principal (implementado)
4. **Validación**: Implementa validaciones tanto en frontend como backend con Zod
5. **Responsive Design**: Todos los componentes deben ser mobile-first
6. **Accesibilidad**: Sigue las mejores prácticas de accesibilidad web
7. **Clean Code**: Aplica principios SOLID y código limpio
8. **Testing**: Considera implementar tests cuando sea apropiado
9. **Base de Datos**: Usa Prisma ORM para todas las operaciones de DB

## Estructura de Archivos
- `/src/app` - Páginas y layouts (App Router)
- `/src/components` - Componentes reutilizables (UI y Layout)
- `/src/lib` - Utilidades y configuraciones (Prisma, PDF, Assessment)
- `/src/types` - Definiciones de tipos TypeScript
- `/src/data` - Datos mock y configuraciones
- `/prisma` - Esquemas y migraciones de base de datos
- `/scripts` - Scripts de utilidad (setup-db.js)

## Características Específicas
- **Assessment**: 10 preguntas de opción múltiple sobre programación web
- **Recomendaciones**: Sistema de puntuación que sugiere cursos apropiados
- **PDF Generation**: Funcionalidad para generar informes descargables
- **Form Validation**: Validaciones robustas en formularios de registro

## Consideraciones de UX/UI
- Diseño limpio y moderno
- Navegación intuitiva
- Feedback visual claro para acciones del usuario
- Loading states y error handling apropiados
