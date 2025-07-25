/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../src/lib/prisma';
import { createError } from '../types/errors';
import { generarRecomendaciones } from '../../src/lib/assessment';

const router = Router();

// Esquema de validación para respuestas del assessment
const assessmentSchema = z.object({
  studentId: z.number().positive('ID de estudiante debe ser un número positivo'),
  respuestas: z.array(
    z.object({
      preguntaId: z.number().positive(),
      respuestaSeleccionada: z.string().min(1, 'Respuesta no puede estar vacía'),
      esCorrecta: z.boolean()
    })
  ).min(1, 'Debe proporcionar al menos una respuesta')
});

// POST /api/assessment/submit - Enviar assessment completado
router.post('/submit', async (req, res, next) => {
  try {
    const validation = assessmentSchema.safeParse(req.body);
    
    if (!validation.success) {
      throw createError(validation.error.issues[0].message, 400);
    }

    const { studentId, respuestas } = validation.data;

    // Verificar que el estudiante existe
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      throw createError('Estudiante no encontrado', 404);
    }

    // Calcular puntuación
    const respuestasCorrectas = respuestas.filter(r => r.esCorrecta).length;
    const totalPreguntas = respuestas.length;
    const porcentajePuntuacion = (respuestasCorrectas / totalPreguntas) * 100;
    
    // Determinar nivel basado en puntuación
    let nivel: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
    if (porcentajePuntuacion >= 80) {
      nivel = 'AVANZADO';
    } else if (porcentajePuntuacion >= 60) {
      nivel = 'INTERMEDIO';
    } else {
      nivel = 'PRINCIPIANTE';
    }

    // Generar recomendaciones basadas en el nivel
    const recomendaciones = generarRecomendaciones(nivel, porcentajePuntuacion);

    // Guardar resultado en la base de datos
    const resultado = await prisma.assessmentResult.create({
      data: {
        studentId,
        puntuacion: porcentajePuntuacion,
        respuestasCorrectas,
        totalPreguntas,
        nivel,
        recomendaciones: JSON.stringify(recomendaciones),
        respuestas: JSON.stringify(respuestas)
      },
      include: {
        student: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      message: 'Assessment enviado exitosamente',
      resultado: {
        id: resultado.id,
        puntuacion: resultado.puntuacion,
        respuestasCorrectas: resultado.respuestasCorrectas,
        totalPreguntas: resultado.totalPreguntas,
        nivel: resultado.nivel,
        recomendaciones,
        fechaRealizacion: resultado.fechaRealizacion,
        student: resultado.student
      }
    });

  } catch (error) {
    next(error);
  }
});

// GET /api/assessment/results/:studentId - Obtener resultados de un estudiante
router.get('/results/:studentId', async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.studentId);
    
    if (isNaN(studentId)) {
      throw createError('ID de estudiante inválido', 400);
    }

    const resultados = await prisma.assessmentResult.findMany({
      where: { studentId },
      orderBy: { fechaRealizacion: 'desc' },
      include: {
        student: {
          select: {
            id: true,
            nombre: true,
            email: true
          }
        }
      }
    });

    // Parsear las recomendaciones JSON
    const resultadosConRecomendaciones = resultados.map((resultado: any) => ({
      ...resultado,
      recomendaciones: JSON.parse(resultado.recomendaciones),
      respuestas: JSON.parse(resultado.respuestas)
    }));

    res.json({ resultados: resultadosConRecomendaciones });

  } catch (error) {
    next(error);
  }
});

// GET /api/assessment/result/:id - Obtener un resultado específico
router.get('/result/:id', async (req, res, next) => {
  try {
    const resultId = parseInt(req.params.id);
    
    if (isNaN(resultId)) {
      throw createError('ID de resultado inválido', 400);
    }

    const resultado = await prisma.assessmentResult.findUnique({
      where: { id: resultId },
      include: {
        student: {
          select: {
            id: true,
            nombre: true,
            email: true,
            telefono: true,
            edad: true,
            nivelEducativo: true,
            experienciaProgramacion: true
          }
        }
      }
    });

    if (!resultado) {
      throw createError('Resultado no encontrado', 404);
    }

    // Parsear JSON
    const resultadoCompleto = {
      ...resultado,
      recomendaciones: JSON.parse(resultado.recomendaciones),
      respuestas: JSON.parse(resultado.respuestas)
    };

    res.json({ resultado: resultadoCompleto });

  } catch (error) {
    next(error);
  }
});

// GET /api/assessment/stats - Obtener estadísticas generales
router.get('/stats', async (req, res, next) => {
  try {
    const [
      totalResultados,
      promedioGeneral,
      distribucionNiveles,
      ultimosResultados
    ] = await Promise.all([
      // Total de assessments realizados
      prisma.assessmentResult.count(),
      
      // Promedio general de puntuación
      prisma.assessmentResult.aggregate({
        _avg: { puntuacion: true }
      }),
      
      // Distribución por niveles
      prisma.assessmentResult.groupBy({
        by: ['nivel'],
        _count: { nivel: true }
      }),
      
      // Últimos 10 resultados
      prisma.assessmentResult.findMany({
        take: 10,
        orderBy: { fechaRealizacion: 'desc' },
        include: {
          student: {
            select: {
              nombre: true,
              email: true
            }
          }
        }
      })
    ]);

    res.json({
      totalResultados,
      promedioGeneral: promedioGeneral._avg.puntuacion || 0,
      distribucionNiveles,
      ultimosResultados: ultimosResultados.map((r: any) => ({
        id: r.id,
        puntuacion: r.puntuacion,
        nivel: r.nivel,
        fechaRealizacion: r.fechaRealizacion,
        student: r.student
      }))
    });

  } catch (error) {
    next(error);
  }
});

export default router;
