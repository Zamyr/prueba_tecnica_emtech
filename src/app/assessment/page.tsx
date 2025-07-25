'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, ArrowLeft, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { assessmentQuestions } from '@/data/questions';
import { AssessmentAnswer, Student } from '@/types';

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cargar datos del estudiante
  useEffect(() => {
    const studentData = localStorage.getItem('currentStudent');
    if (!studentData) {
      router.push('/registro');
      return;
    }
    setCurrentStudent(JSON.parse(studentData));
  }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Finalizar assessment
      finishAssessment(updatedAnswers);
    } else {
      // Siguiente pregunta
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Cargar respuesta anterior si existe
      const previousAnswer = answers[currentQuestionIndex - 1];
      if (previousAnswer) {
        setSelectedAnswer(previousAnswer.selectedAnswer);
      } else {
        setSelectedAnswer(null);
      }
    }
  };

  const finishAssessment = async (finalAnswers: AssessmentAnswer[]) => {
    if (!currentStudent) return;

    setIsLoading(true);
    try {
      // Mapear respuestas al formato esperado por la API
      const respuestas = finalAnswers.map((answer, index) => ({
        preguntaId: index + 1,
        respuestaSeleccionada: assessmentQuestions[index].options[answer.selectedAnswer],
        esCorrecta: answer.selectedAnswer === assessmentQuestions[index].correctAnswer
      }));

      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: currentStudent.id,
          respuestas: respuestas
        }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('assessmentResult', JSON.stringify(result.resultado));
        router.push('/resultados');
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error('Error al guardar resultados');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar los resultados. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cargando...</h2>
          <p className="text-gray-600">Redirigiendo a registro...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Procesando resultados...</h2>
          <p className="text-gray-600">Por favor espera mientras calculamos tu puntuación</p>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Hola, {currentStudent.name}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Pregunta {currentQuestionIndex + 1} de {assessmentQuestions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-4 flex-shrink-0">
                <span className="text-blue-600 font-bold text-lg">
                  {currentQuestionIndex + 1}
                </span>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentQuestion.question}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {currentQuestion.category.toUpperCase()}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {currentQuestion.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswer === index}
                    onChange={() => handleAnswerSelect(index)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full mr-3 border-2 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span 
                    className="text-gray-900"
                    dangerouslySetInnerHTML={{ __html: option }}
                  />
                </div>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Anterior
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {isLastQuestion ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Finalizar Assessment
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Consejos</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Lee cada pregunta cuidadosamente</li>
            <li>• Puedes volver a preguntas anteriores si necesitas cambiar tu respuesta</li>
            <li>• No hay límite de tiempo, tómate el que necesites</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
