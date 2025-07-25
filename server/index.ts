/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import { prisma } from '../src/lib/prisma';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares básicos
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas de la API - Implementación directa para evitar errores de importación

// Esquema de validación para estudiante
const studentSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  edad: z.number().min(16).max(100).optional(),
  nivelEducativo: z.enum(['SECUNDARIA', 'UNIVERSITARIO', 'POSGRADO', 'OTRO']).optional(),
  experienciaProgramacion: z.enum(['NINGUNA', 'BASICA', 'INTERMEDIA', 'AVANZADA']).optional()
});

// POST /api/students - Crear nuevo estudiante
app.post('/api/students', async (req, res) => {
  try {
    const validation = studentSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.issues[0].message
      });
    }

    const studentData = validation.data;

    // Verificar si ya existe un estudiante con ese email
    const existingStudent = await prisma.student.findUnique({
      where: { email: studentData.email }
    });

    if (existingStudent) {
      return res.status(409).json({
        error: 'Ya existe un estudiante registrado con este email'
      });
    }

    // Crear estudiante
    const student = await prisma.student.create({
      data: studentData,
      select: {
        id: true,
        nombre: true,
        email: true,
        telefono: true,
        edad: true,
        nivelEducativo: true,
        experienciaProgramacion: true,
        fechaRegistro: true
      }
    });

    res.status(201).json({
      message: 'Estudiante registrado exitosamente',
      student
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/students - Obtener todos los estudiantes
app.get('/api/students', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        skip: offset,
        take: limit,
        orderBy: { fechaRegistro: 'desc' },
        select: {
          id: true,
          nombre: true,
          email: true,
          telefono: true,
          edad: true,
          nivelEducativo: true,
          experienciaProgramacion: true,
          fechaRegistro: true
        }
      }),
      prisma.student.count()
    ]);

    res.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/assessment/submit - Enviar assessment
app.post('/api/assessment/submit', async (req, res) => {
  try {
    const { studentId, respuestas } = req.body;

    if (!studentId || !respuestas || !Array.isArray(respuestas)) {
      return res.status(400).json({
        error: 'Datos inválidos'
      });
    }

    // Verificar que el estudiante existe
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({
        error: 'Estudiante no encontrado'
      });
    }

    // Calcular puntuación
    const respuestasCorrectas = respuestas.filter((r: { esCorrecta: boolean }) => r.esCorrecta).length;
    const totalPreguntas = respuestas.length;
    const porcentajePuntuacion = (respuestasCorrectas / totalPreguntas) * 100;
    
    // Determinar nivel
    let nivel: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
    if (porcentajePuntuacion >= 80) {
      nivel = 'AVANZADO';
    } else if (porcentajePuntuacion >= 60) {
      nivel = 'INTERMEDIO';
    } else {
      nivel = 'PRINCIPIANTE';
    }

    // Crear resultado
    const resultado = await prisma.assessmentResult.create({
      data: {
        studentId,
        puntuacion: porcentajePuntuacion,
        respuestasCorrectas,
        totalPreguntas,
        nivel,
        recomendaciones: JSON.stringify([]),
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
        fechaRealizacion: resultado.fechaRealizacion,
        student: resultado.student
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de salud del servidor
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Manejo global de errores
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  
  const status = (err as any).status || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Error interno del servidor'
    : err.message;

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express ejecutándose en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
