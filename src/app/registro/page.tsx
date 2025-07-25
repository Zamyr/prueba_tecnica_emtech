'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookOpen, ArrowLeft, User, Mail, Calendar, GraduationCap } from 'lucide-react';
import { StudentRegistration } from '@/types';

const registrationSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  age: z.number().min(13, 'Debes tener al menos 13 años').max(100, 'Ingresa una edad válida'),
  educationLevel: z.enum(['beginner', 'intermediate', 'advanced'], {
    message: 'Selecciona un nivel educativo'
  })
});

export default function RegistroPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<StudentRegistration>({
    resolver: zodResolver(registrationSchema)
  });

  const selectedLevel = watch('educationLevel');

  const onSubmit = async (data: StudentRegistration) => {
    setIsLoading(true);
    try {
      // Mapear campos del inglés al español para la API
      const mappedData = {
        nombre: data.name,
        email: data.email,
        edad: data.age,
        telefono: '', // Campo opcional
        experiencia: data.educationLevel === 'beginner' ? 'principiante' : 
                    data.educationLevel === 'intermediate' ? 'intermedio' : 'avanzado'
      };

      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mappedData),
      });

      if (response.ok) {
        const result = await response.json();
        // Guardar datos del estudiante en localStorage para el assessment
        localStorage.setItem('currentStudent', JSON.stringify(result.student));
        router.push('/assessment');
      } else {
        const errorData = await response.json();
        
        // Mostrar mensaje específico según el tipo de error
        let errorMessage = 'Ocurrió un error al registrarte. Inténtalo de nuevo.';
        
        if (response.status === 409) {
          errorMessage = 'Ya existe una cuenta con este email. Usa otro email o ve al assessment si ya te registraste antes.';
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error al registrarte. Inténtalo de nuevo.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                EduTech Academy
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Registro de Estudiante
          </h1>
          <p className="text-xl text-gray-600">
            Completa tu información para comenzar el assessment personalizado
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Nombre Completo
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Ingresa tu nombre completo"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Correo Electrónico
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Edad */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-2" />
                Edad
              </label>
              <input
                {...register('age', { valueAsNumber: true })}
                type="number"
                min="13"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Ingresa tu edad"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            {/* Nivel Educativo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <GraduationCap className="h-4 w-4 inline mr-2" />
                Nivel de Conocimiento en Programación
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative">
                  <input
                    {...register('educationLevel')}
                    type="radio"
                    value="beginner"
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedLevel === 'beginner'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <h3 className="font-semibold text-center">Principiante</h3>
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Poco o nada de experiencia en programación
                    </p>
                  </div>
                </label>
                
                <label className="relative">
                  <input
                    {...register('educationLevel')}
                    type="radio"
                    value="intermediate"
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedLevel === 'intermediate'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <h3 className="font-semibold text-center">Intermedio</h3>
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Conocimientos básicos de programación
                    </p>
                  </div>
                </label>
                
                <label className="relative">
                  <input
                    {...register('educationLevel')}
                    type="radio"
                    value="advanced"
                    className="sr-only"
                  />
                  <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedLevel === 'advanced'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <h3 className="font-semibold text-center">Avanzado</h3>
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Experiencia sólida en programación
                    </p>
                  </div>
                </label>
              </div>
              {errors.educationLevel && (
                <p className="mt-2 text-sm text-red-600">{errors.educationLevel.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? 'Registrando...' : 'Continuar al Assessment'}
            </button>
          </form>

          {/* Already registered link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link 
                href="/assessment" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Ir directamente al Assessment
              </Link>
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">¿Qué sigue después del registro?</h3>
          <ul className="text-blue-800 space-y-2">
            <li>• Responderás 10 preguntas sobre programación web</li>
            <li>• Recibirás tu puntuación inmediatamente</li>
            <li>• Obtendrás recomendaciones personalizadas de cursos</li>
            <li>• Podrás descargar un informe completo en PDF</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
