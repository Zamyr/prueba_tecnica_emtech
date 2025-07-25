import { AssessmentResult, AssessmentAnswer, CourseRecommendation } from '../types';
import { availableCourses } from '../data/courses';

export function calculateAssessmentScore(answers: AssessmentAnswer[]): {
  score: number;
  percentage: number;
  totalQuestions: number;
} {
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = answers.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return {
    score: correctAnswers,
    percentage,
    totalQuestions
  };
}

export function generateCourseRecommendations(
  assessmentResult: AssessmentResult,
  studentLevel: 'beginner' | 'intermediate' | 'advanced'
): CourseRecommendation[] {
  const recommendations: CourseRecommendation[] = [];
  
  // Análisis basado en el porcentaje obtenido
  const { percentage } = assessmentResult;
  
  if (percentage < 40) {
    // Estudiante necesita cursos básicos
    recommendations.push(
      {
        course: availableCourses.find(c => c.id === '8')!,
        reason: 'Comenzar con los fundamentos del desarrollo web te ayudará a construir una base sólida.',
        priority: 1
      },
      {
        course: availableCourses.find(c => c.id === '1')!,
        reason: 'Después de los conceptos básicos, enfócate en HTML y CSS para crear páginas web.',
        priority: 2
      },
      {
        course: availableCourses.find(c => c.id === '2')!,
        reason: 'JavaScript es esencial para la programación web moderna.',
        priority: 3
      }
    );
  } else if (percentage < 70) {
    // Estudiante con conocimientos intermedios
    recommendations.push(
      {
        course: availableCourses.find(c => c.id === '2')!,
        reason: 'Fortalece tus conocimientos de JavaScript con conceptos modernos.',
        priority: 1
      },
      {
        course: availableCourses.find(c => c.id === '7')!,
        reason: 'Mejora tus habilidades de CSS para crear interfaces más atractivas.',
        priority: 2
      },
      {
        course: availableCourses.find(c => c.id === '3')!,
        reason: 'React te permitirá crear aplicaciones web interactivas.',
        priority: 3
      }
    );
  } else {
    // Estudiante avanzado
    recommendations.push(
      {
        course: availableCourses.find(c => c.id === '4')!,
        reason: 'Expande tus habilidades hacia el backend con Node.js.',
        priority: 1
      },
      {
        course: availableCourses.find(c => c.id === '10')!,
        reason: 'TypeScript mejorará la calidad y mantenibilidad de tu código.',
        priority: 2
      },
      {
        course: availableCourses.find(c => c.id === '6')!,
        reason: 'Conviértete en un desarrollador full stack completo.',
        priority: 3
      }
    );
  }

  // Ajustar según el nivel del estudiante
  if (studentLevel === 'beginner') {
    return recommendations.filter(rec => 
      rec.course.level === 'beginner' || 
      (rec.course.level === 'intermediate' && rec.priority <= 2)
    );
  } else if (studentLevel === 'intermediate') {
    return recommendations.filter(rec => 
      rec.course.level !== 'beginner' || rec.priority === 1
    );
  }

  return recommendations.slice(0, 4);
}

export function formatAssessmentReport(
  student: { name: string; email: string; educationLevel: string },
  result: AssessmentResult
): string {
  const date = new Date().toLocaleDateString('es-ES');
  
  return `
REPORTE DE EVALUACIÓN - PLATAFORMA DE CURSOS EN LÍNEA
=====================================================

Estudiante: ${student.name}
Email: ${student.email}
Nivel Educativo: ${student.educationLevel}
Fecha de Evaluación: ${date}

RESULTADOS DEL ASSESSMENT
========================
Preguntas Respondidas: ${result.totalQuestions}
Respuestas Correctas: ${result.score}
Puntuación: ${result.percentage}%

RECOMENDACIONES DE CURSOS
========================
${result.recommendations.map((rec, index) => `
${index + 1}. ${rec.course.title}
   Nivel: ${rec.course.level}
   Duración: ${rec.course.duration}
   Razón: ${rec.reason}
   
   Descripción: ${rec.course.description}
   Temas: ${rec.course.topics.join(', ')}
   Prerrequisitos: ${rec.course.prerequisites.join(', ')}
`).join('\n')}

PRÓXIMOS PASOS
=============
1. Revisa las recomendaciones de cursos basadas en tu puntuación
2. Comienza con el curso de mayor prioridad
3. Dedica tiempo regular al estudio (recomendado: 2-3 horas por día)
4. Practica con proyectos reales mientras estudias
5. No dudes en contactar a nuestros instructores si necesitas ayuda

¡Gracias por usar nuestra plataforma de cursos en línea!
Para más información, visita nuestro sitio web.
  `;
}

// Función adicional para el backend Express
export function generarRecomendaciones(
  nivel: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO', 
  porcentaje: number
): CourseRecommendation[] {
  const recommendations: CourseRecommendation[] = [];
  
  if (nivel === 'PRINCIPIANTE') {
    recommendations.push(
      {
        course: availableCourses.find(c => c.id === '8')!,
        reason: 'Comenzar con los fundamentos del desarrollo web te ayudará a construir una base sólida.',
        priority: 1
      },
      {
        course: availableCourses.find(c => c.id === '1')!,
        reason: 'Después de los conceptos básicos, enfócate en HTML y CSS para crear páginas web.',
        priority: 2
      }
    );
  } else if (nivel === 'INTERMEDIO') {
    recommendations.push(
      {
        course: availableCourses.find(c => c.id === '2')!,
        reason: 'Fortalece tus conocimientos de JavaScript con conceptos modernos.',
        priority: 1
      },
      {
        course: availableCourses.find(c => c.id === '3')!,
        reason: 'React te permitirá crear aplicaciones web interactivas.',
        priority: 2
      }
    );
  } else {
    recommendations.push(
      {
        course: availableCourses.find(c => c.id === '4')!,
        reason: 'Expande tus habilidades hacia el backend con Node.js.',
        priority: 1
      },
      {
        course: availableCourses.find(c => c.id === '10')!,
        reason: 'TypeScript mejorará la calidad y mantenibilidad de tu código.',
        priority: 2
      }
    );
  }
  
  return recommendations;
}
