import { NextRequest, NextResponse } from 'next/server';
import { generarRecomendaciones } from '../../../lib/assessment';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

// Esquema de validación
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos con Zod
    const validation = assessmentSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos',
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { studentId, respuestas } = validation.data;

    // Verificar que el estudiante existe
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Estudiante no encontrado' },
        { status: 404 }
      );
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

    return NextResponse.json({
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
    }, { status: 201 });

  } catch (error) {
    console.error('Error procesando assessment:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const studentId = url.searchParams.get('studentId');
    
    if (!studentId) {
      return NextResponse.json(
        { error: 'ID de estudiante requerido' },
        { status: 400 }
      );
    }

    const resultados = await prisma.assessmentResult.findMany({
      where: { studentId: parseInt(studentId) },
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

    return NextResponse.json({ resultados: resultadosConRecomendaciones });

  } catch (error) {
    console.error('Error obteniendo resultados:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
