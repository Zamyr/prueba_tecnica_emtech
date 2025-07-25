import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  try {
    // Prueba simple de conexión
    const count = await prisma.student.count();
    
    return NextResponse.json({
      message: 'Conexión con base de datos exitosa',
      totalStudents: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error de base de datos:', error);
    return NextResponse.json(
      { 
        error: 'Error de conexión con base de datos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
