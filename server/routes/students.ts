import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../src/lib/prisma';
import { createError } from '../types/errors';

const router = Router();

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
router.post('/', async (req, res, next) => {
  try {
    const validation = studentSchema.safeParse(req.body);
    
    if (!validation.success) {
      throw createError(validation.error.issues[0].message, 400);
    }

    const studentData = validation.data;

    // Verificar si ya existe un estudiante con ese email
    const existingStudent = await prisma.student.findUnique({
      where: { email: studentData.email }
    });

    if (existingStudent) {
      throw createError('Ya existe un estudiante registrado con este email', 409);
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
    next(error);
  }
});

// GET /api/students - Obtener todos los estudiantes
router.get('/', async (req, res, next) => {
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
          fechaRegistro: true,
          _count: {
            select: {
              resultados: true
            }
          }
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
    next(error);
  }
});

// GET /api/students/:id - Obtener estudiante por ID
router.get('/:id', async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      throw createError('ID de estudiante inválido', 400);
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        resultados: {
          orderBy: { fechaRealizacion: 'desc' },
          take: 5 // Últimos 5 resultados
        }
      }
    });

    if (!student) {
      throw createError('Estudiante no encontrado', 404);
    }

    res.json({ student });

  } catch (error) {
    next(error);
  }
});

// PUT /api/students/:id - Actualizar estudiante
router.put('/:id', async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      throw createError('ID de estudiante inválido', 400);
    }

    const validation = studentSchema.partial().safeParse(req.body);
    
    if (!validation.success) {
      throw createError(validation.error.issues[0].message, 400);
    }

    const updateData = validation.data;

    // Verificar que el estudiante existe
    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!existingStudent) {
      throw createError('Estudiante no encontrado', 404);
    }

    // Si se actualiza el email, verificar que no esté en uso
    if (updateData.email && updateData.email !== existingStudent.email) {
      const emailInUse = await prisma.student.findUnique({
        where: { email: updateData.email }
      });

      if (emailInUse) {
        throw createError('El email ya está en uso por otro estudiante', 409);
      }
    }

    // Actualizar estudiante
    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: updateData,
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

    res.json({
      message: 'Estudiante actualizado exitosamente',
      student: updatedStudent
    });

  } catch (error) {
    next(error);
  }
});

// DELETE /api/students/:id - Eliminar estudiante
router.delete('/:id', async (req, res, next) => {
  try {
    const studentId = parseInt(req.params.id);
    
    if (isNaN(studentId)) {
      throw createError('ID de estudiante inválido', 400);
    }

    // Verificar que el estudiante existe
    const existingStudent = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!existingStudent) {
      throw createError('Estudiante no encontrado', 404);
    }

    // Eliminar estudiante (esto también eliminará sus resultados por CASCADE)
    await prisma.student.delete({
      where: { id: studentId }
    });

    res.json({
      message: 'Estudiante eliminado exitosamente'
    });

  } catch (error) {
    next(error);
  }
});

export default router;
