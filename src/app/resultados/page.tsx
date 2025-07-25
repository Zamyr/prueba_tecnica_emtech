'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen,
  Download, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Star,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Student, CourseRecommendation } from '@/types';

interface AssessmentResult {
  id: number;
  puntuacion: number;
  respuestasCorrectas: number;
  totalPreguntas: number;
  nivel: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO';
  recomendaciones: CourseRecommendation[];
  fechaRealizacion: string;
  student: {
    id: number;
    nombre: string;
    email: string;
  };
}

export default function ResultadosPage() {
  const router = useRouter();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Cargar datos del estudiante y resultado
    const studentData = localStorage.getItem('currentStudent');
    const resultData = localStorage.getItem('assessmentResult');

    if (!studentData || !resultData) {
      router.push('/registro');
      return;
    }

    setCurrentStudent(JSON.parse(studentData));
    setResult(JSON.parse(resultData));
  }, [router]);

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excelente', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (percentage >= 60) return { level: 'Bueno', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (percentage >= 40) return { level: 'Regular', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Necesita Mejorar', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const handleDownloadPDF = async () => {
    if (!currentStudent || !result) return;
    
    setIsGeneratingPDF(true);
    try {
      const { generatePDFReport } = await import('@/lib/pdf-generator');
      
      const reportData = {
        student: currentStudent,
        score: result.puntuacion,
        percentage: result.puntuacion,
        totalQuestions: result.totalPreguntas,
        correctAnswers: result.respuestasCorrectas,
        timeElapsed: 0, // No tenemos tiempo en la estructura actual
        recommendations: result.recomendaciones,
        completedAt: result.fechaRealizacion
      };
      
      const pdfBlob = await generatePDFReport(reportData);
      
      // Descargar el PDF
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `reporte-assessment-${currentStudent.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleRetakeAssessment = () => {
    localStorage.removeItem('assessmentResult');
    router.push('/assessment');
  };

  if (!currentStudent || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cargando resultados...</h2>
          <p className="text-gray-600">Redirigiendo si no hay datos...</p>
        </div>
      </div>
    );
  }

  const performance = getPerformanceLevel(result.puntuacion);

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
            <div className="text-sm text-gray-600">
              {currentStudent.name}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Assessment Completado!
          </h1>
          <p className="text-gray-600 text-lg">
            Aquí están tus resultados y recomendaciones personalizadas
          </p>
        </div>

        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Score */}
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {result.puntuacion}%
              </div>
              <div className="text-sm text-gray-600">Puntuación Final</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${performance.bgColor} ${performance.color}`}>
                {performance.level}
              </div>
            </div>

            {/* Correct Answers */}
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {result.respuestasCorrectas}/{result.totalPreguntas}
              </div>
              <div className="text-sm text-gray-600">Respuestas Correctas</div>
            </div>

            {/* Time */}
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center">
                <Clock className="h-6 w-6 mr-1" />
                {result.recomendaciones.length}
              </div>
              <div className="text-sm text-gray-600">Cursos Recomendados</div>
            </div>

            {/* Recommendations */}
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {result.recomendaciones.length}
              </div>
              <div className="text-sm text-gray-600">Cursos Recomendados</div>
            </div>
          </div>
        </div>

        {/* Course Recommendations */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              Cursos Recomendados Para Ti
            </h2>
          </div>

          <div className="space-y-4">
            {result.recomendaciones.map((recommendation: CourseRecommendation, index: number) => (
              <div 
                key={recommendation.course.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {recommendation.course.title}
                      </h3>
                      <div className="ml-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          (4.8)
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-2">
                      {recommendation.course.description}
                    </p>
                    
                    <p className="text-blue-700 bg-blue-50 p-2 rounded text-sm mb-3">
                      💡 {recommendation.reason}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {recommendation.course.level}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {recommendation.course.duration}
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        Gratis
                      </span>
                    </div>
                  </div>
                  
                  <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    Ver Curso
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
          >
            {isGeneratingPDF ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generando Reporte...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Descargar Reporte PDF
              </>
            )}
          </button>

          <button
            onClick={handleRetakeAssessment}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Repetir Assessment
          </button>

          <Link
            href="/"
            className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Volver al Inicio
          </Link>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 Próximos Pasos Recomendados
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              Revisa tus resultados y las áreas de mejora identificadas
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              Comienza con el primer curso recomendado
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              Dedica tiempo regular al estudio (2-3 horas por día)
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              Practica con proyectos reales mientras estudias
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
