import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma';

const studentSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefono: z.string().optional(),
  edad: z.number().min(16).max(100).optional(),
  nivelEducativo: z.enum(['SECUNDARIA', 'UNIVERSITARIO', 'POSGRADO', 'OTRO']).optional(),
  experienciaProgramacion: z.enum(['NINGUNA', 'BASICA', 'INTERMEDIA', 'AVANZADA']).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos con Zod
    const validatedData = studentSchema.parse({
      ...body,
      edad: body.edad ? parseInt(body.edad) : undefined
    });

    // Verificar si el email ya existe
    const existingStudent = await prisma.student.findUnique({
      where: {
        email: validatedData.email
      }
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Ya existe un estudiante con este email' },
        { status: 409 }
      );
    }

    // Crear estudiante en base de datos
    const student = await prisma.student.create({
      data: validatedData
    });

    return NextResponse.json({
      message: 'Estudiante registrado exitosamente',
      student: {
        id: student.id,
        nombre: student.nombre,
        email: student.email,
        telefono: student.telefono,
        edad: student.edad,
        nivelEducativo: student.nivelEducativo,
        experienciaProgramacion: student.experienciaProgramacion,
        fechaRegistro: student.fechaRegistro
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error registrando estudiante:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Datos inválidos', 
          details: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        skip: offset,
        take: limit,
        orderBy: { fechaRegistro: 'desc' },
        include: {
          resultados: {
            take: 1,
            orderBy: { fechaRealizacion: 'desc' }
          }
        }
      }),
      prisma.student.count()
    ]);

    return NextResponse.json({
      students,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
