import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../src/lib/prisma';
import { createError } from '../types/errors';

const router = Router();

// Esquemas de validación
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

const registerSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  telefono: z.string().optional(),
  edad: z.number().min(16).max(100).optional()
});

// POST /api/auth/register - Registro de administradores
router.post('/register', async (req, res, next) => {
  try {
    const validation = registerSchema.safeParse(req.body);
    
    if (!validation.success) {
      throw createError(validation.error.issues[0].message, 400);
    }

    const { nombre, email, password, telefono, edad } = validation.data;

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw createError('El usuario ya existe', 409);
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        telefono,
        edad,
        rol: 'ADMIN' // Por defecto los usuarios del backend son admins
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        fechaRegistro: true
      }
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user
    });

  } catch (error) {
    next(error);
  }
});

// POST /api/auth/login - Login
router.post('/login', async (req, res, next) => {
  try {
    const validation = loginSchema.safeParse(req.body);
    
    if (!validation.success) {
      throw createError(validation.error.issues[0].message, 400);
    }

    const { email, password } = validation.data;

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw createError('Credenciales inválidas', 401);
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw createError('Credenciales inválidas', 401);
    }

    // Generar JWT
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        rol: user.rol 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });

  } catch (error) {
    next(error);
  }
});

// GET /api/auth/me - Obtener información del usuario autenticado
router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      throw createError('Token no proporcionado', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload & { userId: number; email: string; rol: string };
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        fechaRegistro: true
      }
    });

    if (!user) {
      throw createError('Usuario no encontrado', 404);
    }

    res.json({ user });

  } catch (error) {
    next(error);
  }
});

export default router;
